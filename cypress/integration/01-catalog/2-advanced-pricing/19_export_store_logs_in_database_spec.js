context('Export Store Logs In the Database 19', () => {
    it('store logs in the database - new job', () => {
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

        //go to export page
        cy.get('.item-export-job').find('a').as('goToExportPageLink')
        cy.get('@goToExportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.get('.general_is_active',{timeout: 60000}).find('.admin__actions-switch-label').as('generalIsActive')
        cy.get('@generalIsActive').click()
        cy.get('.general_title ').find('input')
            .type('Advanced Pricing Export - store logs in database')
            .should('have.value', 'Advanced Pricing Export - store logs in database')

        //specify Export Settings section
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('advanced_pricing',{force:true})

        //specify Export Behavior section
        cy.get('.behavior_behavior_field_file_format').find('select').as('fileFormat')
        cy.get('@fileFormat').select('xlsx',{force:true})

        //specify Import Source section
        cy.specifySftpSource('exportSftp' , '/chroot/home/a0563af8/develop-gold.dev.firebearstudio.com/pub/media/importexport/test/var/export_advanced_pricing.xlsx')

        //check sftp connection
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('Success! Your connection is ready!',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Export results
        cy.consoleExportResult('Entity advanced_pricing')

        //close console
        cy.get('.import_export_job_form_import_export_job_form_run_export').find('.action-close').click()

        //click on the history export job button
        cy.get('.page-actions-buttons',{timeout: 10000}).find('#view_history').click({force:true})
        cy.get('.import_export_job_form_import_export_job_form_history_export',{timeout: 10000}).contains('database',{timeout: 10000})
        
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
