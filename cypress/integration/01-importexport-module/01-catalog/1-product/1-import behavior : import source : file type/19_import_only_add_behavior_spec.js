
context('Import Products Only Update behavior 19', () => {
    it('only update - behavior - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click({force:true})

        //specify general section
        cy.generalImportSectionWithoutReIndex('Product Import - only update - behavior')
        
        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click({force:true})
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('catalog_product',{force:true});

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('update',{force:true});

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/products-only-update-second-file.csv')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity catalog_product')
        cy.get('#debug-run').contains('product with sku: Only-Update-TST-Conf-Simp-S-Gray')
        cy.get('#debug-run').contains('product with sku: Only-Update-TST-Conf-Simp-S-Green')
        cy.get('#debug-run').contains('product with sku: Only-Update-TST-Conf-Simp-S-Purple')
        cy.get('#debug-run').contains('product with sku: Only-Update-TST-Conf-Simp-L-Gray')
        cy.get('#debug-run').contains('product with sku: Only-Update-TST-Conf-Simp-L-Green')
        cy.get('#debug-run').contains('product with sku: Only-Update-TST-Conf')
    })
})
