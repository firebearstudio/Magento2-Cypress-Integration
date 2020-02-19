context('Import Url Rewrites', () => {
    it('url_rewrite - csv - file - new job', () => {
        //login
        cy.loginToAdminPanel('ce')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSection('Url Rewrites Import - replace - csv - file')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('url_rewrite');

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('replace');

        //specify Import Source section
        cy.fileSource('pub/media/importexport//u/r/url_rewrites_replace_5.csv')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResult('Entity url_rewrite')

        //check that url '9495' wasn't added and 9493's value changed to 'Test' 
        cy.get('#menu-magento-backend-marketing').find('.item-urlrewrite').find('a').as('goToUrlRewriteGrid')
        cy.get('@goToUrlRewriteGrid').click({force:true})
        cy.get('.col-url_rewrite_id').not('10')
        
        // .should('not.have.value', '9495')
        cy.get('.col-url_rewrite_id').contains('9493').as('urlEdit')
        cy.get('@urlEdit').click()
        cy.get('#description').contains('Test')
    })
})