
context('Export Search Terms ODS Sftp 14', () => {
    it('ods - sftp - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-export-job').find('a').as('goToExportPageLink')
        cy.get('@goToExportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click({force:true})

        //specify general section
        cy.get('.general_is_active',{timeout: 60000}).find('.admin__actions-switch-label').as('generalIsActive')
        cy.get('@generalIsActive').click({force:true})
        cy.get('.general_title ').find('input')
            .type('Search Terms Export - ods - sftp')
            .should('have.value', 'Search Terms Export - ods - sftp')

        //specify Export Settings section
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('search_query',{force:true})

        //specify Export Behavior section
        cy.get('.behavior_behavior_field_file_format').find('select').as('fileFormat')
        cy.get('@fileFormat').select('ods',{force:true});

        //specify Import Source section
        cy.specifySftpSource('exportSftp' , '/chroot/home/a0563af8/develop-gold.dev.firebearstudio.com/pub/media/importexport/test/var/export_ods_products.ods')

        //check ftp connection
        cy.get('.source_check_button').click({force:true})
        cy.get('.fieldset_source').contains('Success! Your connection is ready!',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Export results
        cy.consoleExportResult('Entity search_terms')
    })
})
