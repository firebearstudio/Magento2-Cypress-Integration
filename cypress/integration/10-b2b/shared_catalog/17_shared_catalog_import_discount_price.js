context('Import Shared Catalog Add Update Discount Price 17', () => {
    it('add update - csv - file - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Shared Catalog Import - add update - discount - price')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('shared_catalog');

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('add_update');

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/b2b_shared_catalog_discount.csv')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity shared_catalog')

        //check that  Shared Catalog were added . Discount price was imported successful. 
        cy.get('#menu-magento-catalog-catalog').find('.item-shared-list').find('a').as('goToSharedCatalogGrid')
        cy.get('@goToSharedCatalogGrid').click({force:true})
        cy.get('table').contains('Shared Catalog 1')
        cy.get('table').contains('Shared Catalog 2')
        cy.get('[data-repeat-index="3"]').contains('Select').click() 
        cy.get('[data-repeat-index="3"]').find('ul').find('[data-repeat-index="0"]').click()
        cy.wait(10000)
        cy.get('#container').contains('Configure').click({force:true})
        cy.get('a[href="#catalog-steps-wizard_step_pricing"]').click()
        cy.get('table').contains('Discount')
        cy.get('table').contains('51.00')
        cy.get('table').contains('Test Configurable-simple product-S-Green')
        
    })
})