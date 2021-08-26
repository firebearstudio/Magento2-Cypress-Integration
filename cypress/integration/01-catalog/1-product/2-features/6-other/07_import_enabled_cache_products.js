
context('Import Products - Enabled cache products', () => {
    it('enabled cache products - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Product Import - Enabled cache products - csv - google sheet')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('catalog_product',{force:true})
        cy.get('[data-index="cache_products"]').find('.admin__actions-switch-label').as('enabledCacheProducts')
        cy.get('@enabledCacheProducts').click({force:true})

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append');

        //specify Import Source section
        cy.googlePathSource('https://docs.google.com/spreadsheets/d/13FemIzzexF5koAdQYjbcKscqoCfXyknYWkQkbSZGPsk/edit#gid=1164219475')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 20000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity catalog_product')

        //run process again
        cy.get('.run').click()

        //check that products were cached 
        cy.get('#debug-run').contains('Product TST-Conf-Simp-S-Gray has not changed',{timeout: 10000})
        cy.get('#debug-run').contains('Product TST-Conf-Simp-S-Green has not changed',{timeout: 10000})
        cy.get('#debug-run').contains('Product TST-Conf-Simp-S-Purple has not changed',{timeout: 10000})
        cy.get('#debug-run').contains('Product TST-Conf-Simp-M-Gray has not changed',{timeout: 10000})
        cy.get('#debug-run').contains('Product TST-Conf-Simp-M-Green has not changed',{timeout: 10000})
    })
})
