
context('Import Customers and Addresses Mapping All rows 9', () => {
    it('add update - csv - file - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click({force:true})

        //specify general section
        cy.generalImportSection('Сustomers and Addresses Import - mapping - all rows - csv - file')
        cy.get('[data-index="indexers"]').find('.admin__control-multiselect').as('indexManagement')
        cy.get('@indexManagement').select('customer_grid',{force:true})

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click({force:true})
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('customer_composite',{force:true});

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append',{force:true});

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/customers_and_addresses_map.csv')

        //validate Import file
        cy.get('.source_check_button').click({force:true})
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //map attributes
        cy.get('.source_data_map_container_replace_default_value').find('select').as('replaceDefaultValue')
        cy.get('@replaceDefaultValue').select('All rows')
        cy.get('tfoot').find('.addButton').as('tfoot')
        cy.get('@tfoot').click({force:true})
        cy.get('.record-1').find('.source_data_map_source_data_system').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('email');
        cy.get('.record-1').find('.source_data_map_source_data_import').find('select').as('sourceDataImport')
        cy.get('@sourceDataImport').select('email_map');

        cy.get('tfoot').find('.addButton').as('tfoot')
        cy.get('@tfoot').click({force:true})
        cy.get('.record-2').find('.source_data_map_source_data_system').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('firstname');
        cy.get('.record-2').find('.source_data_map_source_data_import').find('select').as('sourceDataImport')
        cy.get('@sourceDataImport').select('firstname_map');

        cy.get('tfoot').find('.addButton').as('tfoot')
        cy.get('@tfoot').click({force:true})
        cy.get('.record-3').find('.source_data_map_source_data_system').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('gender');
        cy.get('.record-3').find('.source_data_map_source_data_import').find('select').as('sourceDataImport')
        cy.get('@sourceDataImport').select('gender_map');
        cy.get('.record-3').find('.source_data_map_source_data_replace').find('input')
            .type('Male')
            .should('have.value', 'Male')

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResult('Entity customer_composite')
        cy.get('#debug-run').contains('customer with email: roni_cost@example.com')
        cy.get('#debug-run').contains('customer with email: doe@test.com')
        cy.get('#debug-run').contains('customer with email: roe@test.com')
        cy.get('#debug-run').contains('address with email: roni_cost@example.com')
        cy.get('#debug-run').contains('address with email: doe@test.com')
        cy.get('#debug-run').contains('address with email: roe@test.com')
    })
})
