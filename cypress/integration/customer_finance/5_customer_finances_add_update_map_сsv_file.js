context('Import Сustomer Finance', () => {
    it('add update - mapping - csv - file - new job', () => {
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
            .type('Customer Finance Import - add update - mapping - csv - file')
            .should('have.value', 'Customer Finance Import - add update - mapping - csv - file')
        cy.get('.general_reindex').find('.admin__actions-switch-label').as('generalReindex')
        cy.get('@generalReindex').click()

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('customer_finance');

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('add_update');

        //specify Import Source section
        cy.get('.import_source').find('select').as('importSource')
        cy.get('@importSource').select('file');
        cy.get('.file_file_path').find('input').as('filePath')
        cy.get('@filePath')
            .type('pub/media/importexport//c/u/customer_finance_map.csv')
            .should('have.value', 'pub/media/importexport//c/u/customer_finance_map.csv')
       
        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //map attributes
        cy.get('.source_data_map_container_replace_default_value').find('select').as('replaceDefaultValue')
        cy.get('@replaceDefaultValue').select('All rows')
        cy.get('tfoot').find('.addButton').as('tfoot')
        cy.get('@tfoot').click({force:true})
        cy.get('.source_data_map_source_data_system').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('reward_points');
        cy.get('.source_data_map_source_data_import').find('select').as('sourceDataImport')
        cy.get('@sourceDataImport').select('reward_points_map');
        cy.get('.source_data_map_source_data_replace').find('input')
            .type('9000')
            .should('have.value', '9000')

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.get('#debug-run').contains('Entity customer_finance',{timeout: 60000})
        cy.get('#debug-run').contains('The import was successful.',{timeout: 600000})
        cy.get('#debug-run').contains('REINDEX completed',{timeout: 600000})
        cy.get('#debug-run').contains('This file is empty').should('not.exist')
        cy.get('#debug-run').contains('Data validation failed').should('not.exist')
        cy.get('#debug-run').contains('Invalid').should('not.exist')
        cy.get('#debug-run').contains('Exception').should('not.exist')

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
        cy.get('#rewardPointsBalanceGrid').find('td').as('rewardPointsBalance')
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
        cy.get('#rewardPointsBalanceGrid').find('td').as('rewardPointsBalance')
        cy.get('@rewardPointsBalance').contains('9000',{timeout: 60000})
    })
})
