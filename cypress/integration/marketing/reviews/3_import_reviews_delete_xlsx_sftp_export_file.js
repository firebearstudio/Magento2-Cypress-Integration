context('Import Review', () => {
    it('delete - xlsx - sftp - new job', () => {
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
            .type('Review Import - delete - xlsx - sftp')
            .should('have.value', 'Review Import - delete - xlsx - sftp')
        cy.get('.general_reindex').find('.admin__actions-switch-label').as('generalReindex')
        cy.get('@generalReindex').click()

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('review');

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('delete');

        //specify Import Source section
        cy.get('.type_file').find('select').as('importSourceType')
        cy.get('@importSourceType').select('xlsx');
        cy.get('.import_source').find('select').as('importSource')
        cy.get('@importSource').select('sftp');
        cy.get('.sftp_file_path').find('input').as('sftpFilePath')
        cy.get('@sftpFilePath')
            .type('/var/www/alex/files/test/export_reviews_add_update.xlsx')
            .should('have.value', '/var/www/alex/files/test/export_reviews_add_update.xlsx')
        cy.get('.sftp_host ').find('input').as('sftpHost')
        cy.get('@sftpHost')
            .type('***')
            .should('have.value', '***')
        cy.get('.sftp_port').find('input').as('sftpPort')
        cy.get('@sftpPort')
            .type('***')
            .should('have.value', '***')
        cy.get('.sftp_username').find('input').as('sftpUserName')
        cy.get('@sftpUserName')
            .type('***')
            .should('have.value', '***')
        cy.get('.sftp_password ').find('input').as('sftpPassword')
        cy.get('@sftpPassword')
            .type('***')
            .should('have.value', '***')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.get('#debug-run').contains('Entity review',{timeout: 60000})
        cy.get('#debug-run').contains('The import was successful.',{timeout: 600000})
        cy.get('#debug-run').contains('REINDEX completed',{timeout: 600000})
        cy.get('#debug-run').contains('This file is empty').should('not.exist')
        cy.get('#debug-run').contains('Data validation failed').should('not.exist')
        cy.get('#debug-run').contains('Invalid').should('not.exist')
        cy.get('#debug-run').contains('Exception').should('not.exist')
    })
})
