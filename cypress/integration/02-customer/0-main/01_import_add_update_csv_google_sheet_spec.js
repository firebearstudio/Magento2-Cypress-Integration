
context('Import Сustomers Add/update Csv Googlesheet 1', () => {
    it('add update - csv - google sheet - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click({force:true})

        //specify general section
        cy.generalImportSection('Customer Import - add update - csv - google sheet')
        cy.get('[data-index="indexers"]').find('.admin__control-multiselect').as('indexManagement')
        cy.get('@indexManagement').select('customer_grid',{force:true})

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click({force:true})
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('customer',{force:true});

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('add_update',{force:true});

        //specify Import Source section
        cy.googlePathSource('https://docs.google.com/spreadsheets/d/13FemIzzexF5koAdQYjbcKscqoCfXyknYWkQkbSZGPsk/edit#gid=1484218940')
        
        //validate Import file
        cy.get('.source_check_button').click({force:true})
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResult('Entity customer')
        cy.get('#debug-run').contains('customer with email: roni_cost@example.com')
        cy.get('#debug-run').contains('customer with email: doe@test.com')
        cy.get('#debug-run').contains('customer with email: roe@test.com')

        //check that customer's values were imported
        cy.get('#menu-magento-customer-customer').find('.item-customer-manage').find('a').as('goToCustomerMainGrid')
        cy.get('@goToCustomerMainGrid').click({force:true})
        //check that the data for Veronica Costello has been imported.
        cy.get('table',{timeout: 60000}).contains('roni_cost@example.com',{timeout: 60000})
        cy.get('table').contains('Veronica Costello')
        cy.get('table').contains('Dec 15, 1973')
        cy.get('table').contains('Default Store View')
        cy.get('table').contains('Female')
        //check that the data for John Doe has been imported.
        cy.get('table',{timeout: 60000}).contains('doe@test.com',{timeout: 60000})
        cy.get('table').contains('Mr. John D Doe Jr.')
        cy.get('table').contains('May 10, 1986')
        cy.get('table').contains('Default Store View')
        cy.get('table').contains('Male')
        //check that the data for Jane Roe has been imported.
        cy.get('table',{timeout: 60000}).contains('roe@test.com',{timeout: 60000})
        cy.get('table').contains('Mrs. Jane R Roe Sr.')
        cy.get('table').contains('Jul 5, 1991')
        cy.get('table').contains('Default Store View')
        cy.get('table').contains('Female') 
    })
})
