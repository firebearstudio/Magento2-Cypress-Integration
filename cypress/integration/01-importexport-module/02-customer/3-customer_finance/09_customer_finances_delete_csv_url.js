context('Import Сustomer Finances Delete Csv Url 9', () => {
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
        cy.generalImportSection('Customer Finances Import - delete - csv - url')
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
        cy.get('@behaviorBehavior').select('delete',{force:true});

        //specify Import Source section
        cy.urlSource('https://4af610548f-253334.nxcli.net/media/importexport/test/customer_finance_delete.csv')

        //validate Import file
        cy.get('.source_check_button').click({force:true})
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResult('Entity customer_finance')

        //check that customer finances were deleted

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

        //check that Veronica's Costello finances were deleted 
        cy.get('#rewardPointsBalanceGrid',{timeout: 10000}).find('td').as('rewardPointsBalance')
        cy.get('@rewardPointsBalance').contains('0',{timeout: 60000})
        cy.get('#balanceGrid').find('td').as('creditBalance')
        cy.get('@creditBalance').contains('$0.00',{timeout: 60000});
        
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

        //check that Mrs. Jane R Roe's finances were deleted 
        cy.get('#rewardPointsBalanceGrid',{timeout: 10000}).find('td').as('rewardPointsBalance')
        cy.get('@rewardPointsBalance').contains('0',{timeout: 60000})
        cy.get('#balanceGrid').find('td').as('creditBalance')
        cy.get('@creditBalance').contains('$0.00',{timeout: 60000});

        //reset filter
        cy.get('#back').click({force:true})
        cy.get('.admin__data-grid-filters-current').contains('Clear all').click({force:true})
    })
})