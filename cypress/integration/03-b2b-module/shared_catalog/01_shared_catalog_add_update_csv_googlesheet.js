context('Import Shared Catalog Add Update Csv GoogleSheet 1', () => {
    it('add update - csv - google sheet - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Shared Catalog Import - add update - csv - google sheet')

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
        cy.googlePathSource('https://docs.google.com/spreadsheets/d/1MTPZL72H3ynXVbkVnK5cdt3uWfEZCtPBYV1M97w9eGg/edit#gid=2137364248')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity shared_catalog')

        //check that  Shared Catalog were added
        cy.get('#menu-magento-catalog-catalog').find('.item-shared-list').find('a').as('goToSharedCatalogGrid')
        cy.get('@goToSharedCatalogGrid').click({force:true})
        cy.get('table').contains('Shared Catalog 1')
        cy.get('table').contains('Shared Catalog 2')
        cy.get('[data-repeat-index="1"]').contains('Select').click() 
        cy.get('[data-repeat-index="1"]').find('ul').find('[data-repeat-index="2"]').click()
        cy.get('[data-index="name"]').find('input').should('have.value','Shared Catalog 1')   
        cy.get('[data-index="type"]').find('select').find('[value="0"]').should('be.selected')
        cy.get('[data-index="tax_class_id"]').find('select').find('[value="3"]').should('be.selected')
        cy.get('[data-index="description"]').find('textarea').should('have.value','Description of Shared Catalog 1')
        cy.get('#back').click() 
        cy.wait(10000)
        cy.get('[data-repeat-index="1"]').contains('Select').click() 
        cy.get('[data-repeat-index="1"]').find('ul').find('[data-repeat-index="1"]').click()
        cy.get('table').contains('Google') 
    })
})