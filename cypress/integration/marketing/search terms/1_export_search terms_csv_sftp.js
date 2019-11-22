context('Export Search Terms', () => {
    it('csv - sftp - new job', () => {
        //login
        cy.visit('http://import.com/admin')
        cy.get('#username')
            .type('admin').should('have.value', 'admin')
        cy.get('#login')
            .type('magento2').should('have.value', 'magento2')
        cy.get('.actions').find('button').as('loginButton')
        cy.get('@loginButton').click()

        //go to import page
        cy.get('.item-export-job').find('a').as('goToExportPageLink')
        cy.get('@goToExportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.get('.general_is_active',{timeout: 60000}).find('.admin__actions-switch-label').as('generalIsActive')
        cy.get('@generalIsActive').click()
        cy.get('.general_title ').find('input')
            .type('Search Terms Export - csv - sftp')
            .should('have.value', 'Search Terms Export - csv - sftp')

        //specify Export Settings section
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('search_query')

        //specify Export Behavior section
        cy.get('.behavior_behavior_field_file_format').find('select').as('fileFormat')
        cy.get('@fileFormat').select('csv');

        //specify Import Source section
        cy.get('.source_export_source_entity').find('select').as('exportSource')
        cy.get('@exportSource').select('sftp');
        cy.get('.export_source_sftp_file_path').find('input').as('sftpFilePath')
        cy.get('@sftpFilePath')
            .type('/var/www/alex/files/test/export_search_terms.csv')
            .should('have.value', '/var/www/alex/files/test/export_search_terms.csv')
        cy.get('.export_source_sftp_host').find('input').as('sftpHost')
        cy.get('@sftpHost')
            .type('***')
            .should('have.value', '***')
        cy.get('.export_source_sftp_port').find('input').as('sftpPort')
        cy.get('@sftpPort')
            .type('***')
            .should('have.value', '***')
        cy.get('.export_source_sftp_username').find('input').as('sftpUserName')
        cy.get('@sftpUserName')
            .type('***')
            .should('have.value', '***')
        cy.get('.export_source_sftp_password ').find('input').as('sftpPassword')
        cy.get('@sftpPassword')
            .type('***')
            .should('have.value', '***')

        //check sftp connection
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('Success! Your connection is ready!',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Export results
        cy.get('#debug-run').contains('Entity search_query',{timeout: 60000})
        cy.get('#debug-run').contains('The export is finished.',{timeout: 60000})
        cy.get('#debug-run').contains('There is no data for the export.',{timeout: 60000}).should('not.exist')
        cy.get('#debug-run').contains('Please provide filter data.',{timeout: 60000}).should('not.exist')
        cy.get('#debug-run').contains('The header column names are already set.',{timeout: 60000}).should('not.exist')
        cy.get('#debug-run').contains('Exception').should('not.exist')
    })
})