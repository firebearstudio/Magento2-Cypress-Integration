
context('Import Products', () => {
    it('only add - json - dropbox - new job', () => {
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
            .type('Product Import - only add - json - dropbox')
            .should('have.value', 'Product Import - only add - json - dropbox')
        cy.get('.general_reindex').find('.admin__actions-switch-label').as('generalReindex')
        cy.get('@generalReindex').click()

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('catalog_product');

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('add');

        //specify Import Source section
        cy.get('.type_file').find('select').as('importSourceType')
        cy.get('@importSourceType').select('json');
        cy.get('.import_source').find('select').as('importSource')
        cy.get('@importSource').select('dropbox');
        cy.get('.dropbox_file_path ').find('input').as('dropboxFilePath')
        cy.get('@dropboxFilePath')
            .type('/import_only_add.json').should('have.value', '/import_only_add.json')
        cy.get('.dropbox_access_token ').find('input').as('dropboxAccessToken')
        cy.get('@dropboxAccessToken')
            .type('***')
            .should('have.value', '***')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.get('#debug-run').contains('Entity catalog_product',{timeout: 60000})
        cy.get('#debug-run').contains('This file is empty',{timeout: 60000}).should('not.exist')
        cy.get('#debug-run').contains('Data validation failed',{timeout: 60000}).should('not.exist')
        cy.get('#debug-run').contains('Import data validation is complete.',{timeout: 60000})
        cy.get('#debug-run').contains('Invalid',{timeout: 60000}).should('not.exist')
    })
})
