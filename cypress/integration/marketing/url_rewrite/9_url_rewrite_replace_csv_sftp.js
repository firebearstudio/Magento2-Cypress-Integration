context('Import Url Rewrites', () => {
    it('url_rewrite - csv - file - new job', () => {
        //login
        cy.visit('http://import.com/admin')
        cy.get('#username')
            .type('admin').should('have.value', 'admin')
        cy.get('#login')
            .type('magento2').should('have.value', 'magento2')
        cy.get('.actions').find('button').as('loginButton')
        cy.get('@loginButton').click()

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.get('.general_is_active',{timeout: 60000}).find('.admin__actions-switch-label').as('generalIsActive')
        cy.get('@generalIsActive').click()
        cy.get('.general_title ').find('input')
            .type('Url Rewrites Import - replace - csv - file')
            .should('have.value', 'Url Rewrites Import - replace - csv - file')
        cy.get('.general_reindex').find('.admin__actions-switch-label').as('generalReindex')
        cy.get('@generalReindex').click()

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
        cy.get('.import_source').find('select').as('importSource')
        cy.get('@importSource').select('file');
        cy.get('.file_file_path').find('input').as('filePath')
        cy.get('@filePath')
            .type('pub/media/importexport//u/r/url_rewrites_replace_5.csv')
            .should('have.value', 'pub/media/importexport//u/r/url_rewrites_replace_5.csv')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.get('#debug-run').contains('Entity url_rewrite',{timeout: 60000})
        cy.get('#debug-run').contains('The import was successful.',{timeout: 60000})
        cy.get('#debug-run').contains('REINDEX completed',{timeout: 60000})
        cy.get('#debug-run').contains('This file is empty').should('not.exist')
        cy.get('#debug-run').contains('Data validation failed').should('not.exist')
        cy.get('#debug-run').contains('Invalid').should('not.exist')
        cy.get('#debug-run').contains('Exception').should('not.exist')

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