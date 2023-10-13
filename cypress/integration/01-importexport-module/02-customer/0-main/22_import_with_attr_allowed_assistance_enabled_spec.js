
context('Import Сustomers Allowed Assistance Enabled 22', () => {
    it('import customer allowed assistance enabled - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click({force:true})

        //specify general section
        cy.generalImportSection('Customer Import - allowed assistance - enabled')
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
        cy.fileSource('pub/media/importexport/test/customer_main_with_allowed_assistance_enabled.csv')

        //validate Import file
        cy.get('.source_check_button').click({force:true})
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResult('Entity customer')
        cy.get('#debug-run').contains('customer with email: roni_cost@example.com')

        //check that customer's values were imported
        cy.get('#menu-magento-customer-customer').find('.item-customer-manage').find('a').as('goToCustomerMainGrid')
        cy.get('@goToCustomerMainGrid').click({force:true})
        //check that customer group was imported successfully 
        cy.get('table',{timeout: 60000}).contains('roni_cost@example.com',{timeout: 60000}).parentsUntil('tbody').as('roniNew')
        cy.get('@roniNew').find('a').click()
        cy.get('.admin__table-secondary').contains('Customer Group:').parent().contains('General')
        cy.get('#tab_customer > [data-bind="text: label"]').click()
        cy.get('[data-index="extension_attributes.assistance_allowed"]').find('[name="customer[extension_attributes][assistance_allowed]"]').should('have.value','2')
    })
})
