
context('Import Сustomer Addresses', () => {
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
            .type('Customer Address Import - add update - csv - google sheet')
            .should('have.value', 'Customer Address Import - add update - csv - google sheet')
        cy.get('.general_reindex').find('.admin__actions-switch-label').as('generalReindex')
        cy.get('@generalReindex').click()

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('customer_address');

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('add_update');

        //specify Import Source section
        cy.get('.import_source').find('select').as('importSource')
        cy.get('@importSource').select('google');
        cy.get('.google_file_path').find('input').as('googleFilePath')
        cy.get('@googleFilePath')
            .invoke('val', 'https://docs.google.com/spreadsheets/d/13FemIzzexF5koAdQYjbcKscqoCfXyknYWkQkbSZGPsk/edit#gid=467742921')
            .trigger('change')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.get('#debug-run').contains('Entity customer_address',{timeout: 60000})
        cy.get('#debug-run').contains('The import was successful.',{timeout: 600000})
        cy.get('#debug-run').contains('REINDEX completed',{timeout: 600000})
        cy.get('#debug-run').contains('This file is empty').should('not.exist')
        cy.get('#debug-run').contains('Data validation failed').should('not.exist')
        cy.get('#debug-run').contains('Invalid').should('not.exist')
        cy.get('#debug-run').contains('Exception').should('not.exist')

        //check that customer addresses were created
        cy.get('#menu-magento-customer-customer').find('.item-customer-manage').find('a').as('goToCustomersGrid')
        cy.get('@goToCustomersGrid').click({force:true})
        cy.get('.admin__data-grid-outer-wrap').contains('3 records found',{timeout: 60000});
        cy.get('.data-row').get('[data-repeat-index="1"]',{timeout: 60000})
            .contains('Edit',{timeout: 60000}).click({force:true})
        cy.get('#tab_address',{timeout: 60000}).click();
        cy.get('[name="address[3][prefix]"]',{timeout: 60000}).should('have.value', 'Mrs.');
        cy.get('[name="address[3][firstname]"]',{timeout: 60000}).should('have.value', 'Jane');
        cy.get('[name="address[3][middlename]"]',{timeout: 60000}).should('have.value', 'R');
        cy.get('[name="address[3][lastname]"]',{timeout: 60000}).should('have.value', 'Roe');
        cy.get('[name="address[3][suffix]"]',{timeout: 60000}).should('have.value', 'Sr.');
        cy.get('[name="address[3][company]"]',{timeout: 60000}).should('have.value', 'FireBear Studio');
        cy.get('[name="address[3][street][0]"]',{timeout: 60000}).should('have.value', 'Test');
        cy.get('[name="address[3][street][1]"]',{timeout: 60000}).should('have.value', '96');
        cy.get('[name="address[3][city]"]',{timeout: 60000}).should('have.value', 'Test');
        cy.get('[name="address[3][country_id]"]',{timeout: 60000}).should('have.value', 'DE');
        cy.get('[name="address[3][postcode]"]',{timeout: 60000}).should('have.value', '12345');
        cy.get('[name="address[3][telephone]"]',{timeout: 60000}).should('have.value', '5555555556');
        cy.get('[name="address[3][vat_id]"]',{timeout: 60000}).should('have.value', 'EU555555555');
    })
})
