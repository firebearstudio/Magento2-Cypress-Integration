
context('Import Customer Addresses', () => {
    it(' find and replace - csv - file - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSection('Customer Addresses Import - find and replace - csv - file')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('customer_address',{force:true});

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('add_update',{force:true});

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/customer_addresses_find_&_replace.csv')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //specify find and replace
        cy.get('[data-index="source_data_replacing_container"]').click({force:true})

        //First row
        cy.get('[data-index="source_data_replacing_container"]').find('[data-action="add_new_row"]').as('addNewRow')
        cy.get('@addNewRow').click()
        cy.get('[data-index="data_source_replacing_attribute"]').find('[name="[0]"]',{timeout: 60000}).select('city (City)',{force:true});
        // Individual words - 0 , Full Value - 1 
        cy.get('[name="source_data_replacing[0][data_source_replacing_target]"]').select('0',{force:true});
        //Yes - 1 , No - 0
        cy.get('[name="source_data_replacing[0][data_source_replacing_is_case_sensitive]"]').select('1',{force:true});
        cy.get('[name="source_data_replacing[0][data_source_replacing_find]"]')
            .type('Test',{force: true})
            .should('have.value', 'Test')
        cy.get('[name="source_data_replacing[0][data_source_replacing_replace]"]')
            .type('London',{force: true})
            .should('have.value', 'London')
        
        //Second row
        cy.get('@addNewRow').click()
        cy.get('[name="[1]"]').select('firstname (First Name)',{force:true});
        cy.get('[name="source_data_replacing[1][data_source_replacing_target]"]').select('0',{force:true});
        cy.get('[name="source_data_replacing[1][data_source_replacing_is_case_sensitive]"]').select('0',{force:true});
        cy.get('[name="source_data_replacing[1][data_source_replacing_find]"]')
            .type('John',{force: true})
            .should('have.value', 'John')
        cy.get('[name="source_data_replacing[1][data_source_replacing_replace]"]')
            .type('Justin',{force: true})
            .should('have.value', 'Justin')

        //Third row
        cy.get('@addNewRow').click()
        cy.get('[name="[2]"]').select('lastname (Last Name)',{force:true});
        cy.get('[name="source_data_replacing[2][data_source_replacing_target]"]').select('1',{force:true});
        cy.get('[name="source_data_replacing[2][data_source_replacing_is_case_sensitive]"]').select('1',{force:true});
        cy.get('[name="source_data_replacing[2][data_source_replacing_find]"]')
            .type('Doe',{force: true})
            .should('have.value', 'Doe')
        cy.get('[name="source_data_replacing[2][data_source_replacing_replace]"]')
            .type('Joe',{force: true})
            .should('have.value', 'Joe')

        //Fourth row
        cy.get('@addNewRow').click()
        cy.get('[name="[3]"]').select('telephone (Phone Number)',{force:true});
        cy.get('[name="source_data_replacing[3][data_source_replacing_target]"]').select('1',{force:true});
        cy.get('[name="source_data_replacing[3][data_source_replacing_is_case_sensitive]"]').select('0',{force:true});
        cy.get('[name="source_data_replacing[3][data_source_replacing_find]"]')
            .type('555',{force: true})
            .should('have.value', '555')
        cy.get('[name="source_data_replacing[3][data_source_replacing_replace]"]')
            .type('777666555',{force: true})
            .should('have.value', '777666555')
    
        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResult('Entity customer_address')

        //check that values were replaced
        cy.get('#menu-magento-customer-customer').find('.item-customer-manage').find('a').as('goToCustomerMainGrid')
        cy.get('@goToCustomerMainGrid').click({force:true})
        cy.get('table',{timeout: 60000}).contains('777666555',{timeout: 60000})
        cy.get('table').contains('London')
    })
})
