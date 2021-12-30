context('Import Store Logs In Database 18', () => {
    it('add update - store - logs - in - database - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to the Firebear configuration
        cy.get('.item-system-config').find('a').as('goToConfiguration')
        cy.get('@goToConfiguration').click({force:true})

        //enable store logs in the database
        cy.get('#anchor-content').contains('Firebear Studio').click()
        cy.get('#anchor-content').contains('Import/Export').click({force:true})
        cy.get('#firebear_importexport_import_config_enable_db_log_storage_inherit').click()
        cy.get('#firebear_importexport_import_config_enable_db_log_storage').select('Yes')
        cy.get('#save').click()
       
        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Advanced Pricing Import - add update - csv - google sheet')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('advanced_pricing',{force:true});

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append',{force:true});

        //specify Import Source section
        cy.googlePathSource('https://docs.google.com/spreadsheets/d/13FemIzzexF5koAdQYjbcKscqoCfXyknYWkQkbSZGPsk/edit#gid=61507826')
       
        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity advanced_pricing')

        //close console
        cy.get('.import_job_form_import_job_form_run_import').find('.action-close').click()

        //click on the history import job button
        cy.get('.page-actions-buttons').find('#view_history').click({force:true})
        cy.get('.modal-inner-wrap',{timeout: 10000}).find('.modal-content')
        cy.get('table',{timeout: 10000}).contains('database',{timeout: 10000})

        //disable store logs in the database
        cy.get('.item-system-config').find('a').as('goToConfiguration')
        cy.get('@goToConfiguration').click({force:true})
        cy.get('#anchor-content').contains('Firebear Studio').click()
        cy.get('#anchor-content').contains('Import/Export').click({force:true})
        cy.get('#firebear_importexport_import_config_enable_db_log_storage').select('No')
        cy.get('#firebear_importexport_import_config_enable_db_log_storage_inherit').click()
        cy.get('#save').click()
    })
})
