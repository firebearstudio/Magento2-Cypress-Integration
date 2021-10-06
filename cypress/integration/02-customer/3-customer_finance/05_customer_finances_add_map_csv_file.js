context('Import Сustomer Finance Mapping Empty Rows 5', () => {
    it('add update - mapping - csv - file - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click({force:true})

        //specify general section
        cy.generalImportSection('Customer Finance Import - add update - mapping empty rows - csv - file')
        cy.get('[data-index="indexers"]').find('.admin__control-multiselect').as('indexManagement')
        cy.get('@indexManagement').select('customer_grid',{force:true})

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click({force:true})
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('customer_finance',{force:true});

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('add_update',{force:true});

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/customer_finance_map.csv')
       
        //validate Import file
        cy.get('.source_check_button').click({force:true})
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //map attributes
        cy.get('.source_data_map_container_replace_default_value').find('select').as('replaceDefaultValue')
        cy.get('@replaceDefaultValue').select('All rows')
        cy.addMappingRowImport('.record-1','reward_points','reward_points_map')
        cy.get('.source_data_map_source_data_replace').find('input')
            .type('9000')
            .should('have.value', '9000')

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResult('Entity customer_finance')

        //check that reward_points were changed

        //go to Veronica's Costello Edit
        cy.get('#menu-magento-customer-customer').find('.item-customer-manage').find('a').as('goToCustomersGrid')
        cy.get('@goToCustomersGrid').click({force:true})
        cy.get('[data-bind="collapsible: {openClass: false, closeOnOuter: false}"]',{timeout: 60000}).find('button').as('filtersButton')
        cy.get('@filtersButton').click({force:true})  
        cy.get('[name="name"]').invoke('val', 'Veronica').trigger('change',{force:true})
        cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 60000}).as('applyFiltersButton')
        cy.get('@applyFiltersButton').click({force:true})
        cy.get('.admin__data-grid-outer-wrap').contains('1 records found',{timeout: 60000})
        cy.get('.admin__data-grid-wrap').contains('Edit',{timeout: 60000})
        cy.get('.admin__data-grid-wrap').contains('Edit').click({force:true})

        //check that Veronica's Costello reward points were changed 
        cy.get('#rewardPointsBalanceGrid',{timeout: 10000}).find('td').as('rewardPointsBalance')
        cy.get('@rewardPointsBalance').contains('9000',{timeout: 60000})
        
        //go to grid with customers
        cy.get('#back').as('backButton')
        cy.get('@backButton').click({force:true})

        //go to Mrs. Jane R Roe's Edit
        cy.get('[data-bind="collapsible: {openClass: false, closeOnOuter: false}"]',{timeout: 60000}).find('button').as('filtersButton')
        cy.get('@filtersButton').click({force:true})  
        cy.get('[name="name"]').invoke('val', 'Mrs. Jane R Roe Sr.').trigger('change',{force:true})
        cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 60000}).as('applyFiltersButton')
        cy.get('@applyFiltersButton').click({force:true})
        cy.get('.admin__data-grid-outer-wrap').contains('1 records found',{timeout: 60000})
        cy.get('.admin__data-grid-wrap').contains('Edit',{timeout: 60000})
        cy.get('.admin__data-grid-wrap').contains('Edit').click({force:true})

        //check that Mrs. Jane R Roe's reward points were changed 
        cy.get('#rewardPointsBalanceGrid',{timeout: 10000}).find('td').as('rewardPointsBalance')
        cy.get('@rewardPointsBalance').contains('9000',{timeout: 60000})

        //reset filter
        cy.get('#back').click({force:true})
        cy.get('.admin__data-grid-filters-current').contains('Clear all').click({force:true})
    })
})