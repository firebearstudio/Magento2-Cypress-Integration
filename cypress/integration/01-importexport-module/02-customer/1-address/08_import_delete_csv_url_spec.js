
context('Import Сustomer Addresses Delete Csv Url 8', () => {
    it('delete - csv - url - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click({force:true})

        //specify general section
        cy.generalImportSection('Customer Address Import - delete - csv - url')
        cy.get('[data-index="indexers"]').find('.admin__control-multiselect').as('indexManagement')
        cy.get('@indexManagement').select('customer_grid',{force:true})

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click({force:true})
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('customer_address',{force:true});

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('delete',{force:true});

        //specify Import Source section
        cy.urlSource('https://4af610548f-253334.nxcli.net/media/importexport/test/customer_addresses.csv')

        //validate Import file
        cy.get('.source_check_button').click({force:true})
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResult('Entity customer_address')
        cy.get('#debug-run').contains('address with email: roni_cost@example.com')
        cy.get('#debug-run').contains('address with email: doe@test.com')
        cy.get('#debug-run').contains('address with email: roe@test.com')

        //check that customer addresses' values were deleted
        cy.get('#menu-magento-customer-customer').find('.item-customer-manage').find('a').as('goToCustomerMainGrid')
        cy.get('@goToCustomerMainGrid').click({force:true})
        //check that the address data for Veronica Costello has been deleted.
        cy.get('table',{timeout: 60000}).contains('roni_cost@example.com',{timeout: 60000})
        cy.get('table').contains('(555) 229-3326').should('not.exist')
        cy.get('table').contains('49628-7978').should('not.exist')
        cy.get('table').contains('United States').should('not.exist')
        cy.get('table').contains('Michigan').should('not.exist')
        //check that the address data for John Doe has been deleted.
        cy.get('table',{timeout: 60000}).contains('doe@test.com',{timeout: 60000})
        cy.get('table').contains('5555555555').should('not.exist')
        //check that the address data for Jane Roe has been deleted.
        cy.get('table',{timeout: 60000}).contains('roe@test.com',{timeout: 60000})
        cy.get('table').contains('5555555556').should('not.exist')
        
    })
})
