
context('Import Сustomer Addresses in different columns 24', () => {
    it('import - addresses in different columns - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click({force:true})

        //specify general section
        cy.generalImportSection('Customer Address Import - in different columns')
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
        cy.get('@behaviorBehavior').select('add_update',{force:true});

        //specify Import Source section
        cy.get('.type_file').find('select').as('importSourceType')
        cy.get('@importSourceType').select('csv',{force:true});
        cy.fileSource('pub/media/importexport/test/customer_addresses_in_different_columns.csv')

        //validate Import file
        cy.get('.source_check_button').click({force:true})
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResult('Entity customer_address')
        cy.get('#debug-run').contains('address with email: doe@test.com')

        //check that customer addresses' values were imported
        cy.get('#menu-magento-customer-customer').find('.item-customer-manage').find('a').as('goToCustomerMainGrid')
        cy.get('@goToCustomerMainGrid').click({force:true})
        //check that streets were imported successfully 
        cy.get('table',{timeout: 60000}).contains('doe@test.com',{timeout: 60000}).parentsUntil('tbody').as('roniNew')
        cy.get('@roniNew').find('a').click()
        cy.get('.admin__scope-old > .fieldset-wrapper > address').contains('Street 1')
        cy.get('.admin__scope-old > .fieldset-wrapper > address').contains('Street 2')
        cy.get('.admin__scope-old > .fieldset-wrapper > address').contains('Street 3')
        cy.get('.admin__scope-old > .fieldset-wrapper > address').contains('Street 4')
      
    })
})
