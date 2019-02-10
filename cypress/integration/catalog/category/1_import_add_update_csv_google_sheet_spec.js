
context('Import Сategories', () => {
    it('add update - csv - google sheet - new job', () => {
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
            .type('Category Import - add update - csv - google sheet')
            .should('have.value', 'Category Import - add update - csv - google sheet')
        cy.get('.general_reindex').find('.admin__actions-switch-label').as('generalReindex')
        cy.get('@generalReindex').click()

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('catalog_category');

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append');

        //specify Import Source section
        cy.get('.source_import_source').find('select').as('importSource')
        cy.get('@importSource').select('google');
        cy.get('.google_file_path').find('input').as('googleFilePath')
        cy.get('@googleFilePath')
            .invoke('val', 'https://docs.google.com/spreadsheets/d/13FemIzzexF5koAdQYjbcKscqoCfXyknYWkQkbSZGPsk/edit#gid=577514786')
            .trigger('change')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.get('#debug-run').contains('Entity catalog_category',{timeout: 60000})
        cy.get('#debug-run').contains('This file is empty',{timeout: 60000}).should('not.exist')
        cy.get('#debug-run').contains('Data validation failed',{timeout: 60000}).should('not.exist')
        cy.get('#debug-run').contains('The import was successful.',{timeout: 60000})

        //check that categories were created
        cy.get('#menu-magento-catalog-catalog').find('.item-catalog-categories').find('a').as('goToCategories')
        cy.get('@goToCategories').click({force:true})
        cy.get('#tree-div').contains('First test category',{timeout: 60000})
        cy.get('#tree-div').contains('Second test category',{timeout: 60000})
        cy.get('#tree-div').contains('Third test category',{timeout: 60000})
    })
})
