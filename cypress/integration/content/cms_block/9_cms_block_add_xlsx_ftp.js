context('Import Cms Block', () => {
    it('add - xlsx - ftp - new job', () => {
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
            .type('Cms Block Import - add - xlsx - ftp')
            .should('have.value', 'Cms Block Import - add - xlsx - ftp')
        cy.get('.general_reindex').find('.admin__actions-switch-label').as('generalReindex')
        cy.get('@generalReindex').click()

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('cms_block');

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append');

        //specify Import Source section
        cy.get('.type_file').find('select').as('importSourceType')
        cy.get('@importSourceType').select('xlsx');
        cy.get('.import_source').find('select').as('importSource')
        cy.get('@importSource').select('ftp');
        cy.get('.ftp_file_path').find('input').as('ftpFilePath')
        cy.get('@ftpFilePath')
            .type('/files/test/cms_blocks.xlsx')
            .should('have.value', '/files/test/cms_blocks.xlsx')
        cy.get('.ftp_host ').find('input').as('ftpHost')
        cy.get('@ftpHost')
            .type('***')
            .should('have.value', '***')
        cy.get('.ftp_port').find('input').as('ftpPort')
        cy.get('@ftpPort')
            .type('***')
            .should('have.value', '***')
        cy.get('.ftp_user').find('input').as('ftpUserName')
        cy.get('@ftpUserName')
            .type('***')
            .should('have.value', '***')
        cy.get('.ftp_password ').find('input').as('ftpPassword')
        cy.get('@ftpPassword')
            .type('***')
            .should('have.value', '***')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.get('#debug-run').contains('Entity cms_block',{timeout: 60000})
        cy.get('#debug-run').contains('REINDEX completed',{timeout: 600000})
        cy.get('#debug-run').contains('This file is empty').should('not.exist')
        cy.get('#debug-run').contains('Data validation failed').should('not.exist')
        cy.get('#debug-run').contains('Invalid').should('not.exist')
        cy.get('#debug-run').contains('Exception').should('not.exist')
    })
})