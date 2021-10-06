
context('Import Customers And Addresses Only Fields From Mapping 12',{ retries: 3 }, () => {
    it(' only mapping fields - csv - file - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Customers And Addresses Import - Only fields from mapping')
        cy.get('[data-index="indexers"]').find('.admin__control-multiselect').as('indexManagement')
        cy.get('@indexManagement').select('customer_grid',{force:true})

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('customer_composite',{force:true});

        //enable Use Only Fields From Mapping
        cy.get('[data-index="use_only_fields_from_mapping"]').find('.admin__actions-switch-label').as('useOnlyMappingFieldsEnabled')
        cy.get('@useOnlyMappingFieldsEnabled').click()

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append',{force:true});

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/customers_and_addresses_only_mapping.csv')
       
        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //map attributes
        cy.get('.source_data_map_container_replace_default_value').find('select').as('replaceDefaultValue')
        cy.get('@replaceDefaultValue').select('All rows')
        cy.addMappingRowImport('.record-1','email','email')
        cy.addMappingRowImport('.record-2','firstname','firstname')
        cy.addMappingRowImport('.record-3','city','_address_city')
        cy.addMappingRowImport('.record-4','country_id','_address_country_id')
        cy.addMappingRowImport('.record-5','telephone','_address_telephone')
        cy.addMappingRowImport('.record-6','lastname','lastname')
        cy.addMappingRowImport('.record-7','street','_address_street')


        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity customer_composite')

        //check if only mapping attributes were updated
        cy.get('#menu-magento-customer-customer').find('.item-customer-manage').find('a').as('goToCustomersGrid')
        cy.get('@goToCustomersGrid').click({force:true})
        cy.get('table',{timeout: 60000}).contains('VeronicaName Costello',{timeout: 60000})
        cy.get('table').should('not.contain','CostelloName')

        //go to Veronica's Costello Edit
        cy.get('[data-bind="collapsible: {openClass: false, closeOnOuter: false}"]',{timeout: 60000}).find('button').as('filtersButton')
        cy.get('@filtersButton').click({force:true})  
        cy.get('[name="name"]').invoke('val', 'Veronica').trigger('change',{force:true})
        cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 60000}).as('applyFiltersButton')
        cy.get('@applyFiltersButton').click({force:true})
        cy.get('.admin__data-grid-outer-wrap').contains('1 records found',{timeout: 60000})
        cy.get('.admin__data-grid-wrap').contains('Edit',{timeout: 60000})
        cy.get('.admin__data-grid-wrap').contains('Edit').click({force:true})
        cy.get('#tab_address').click()

        //check if only mapping attributes were updated
        cy.get('.customer-default-address-wrapper').contains('CalderCity')
        cy.get('.customer-default-address-wrapper').contains('6146 Honey Bluff Parkway')

        //reset filter
        cy.get('#back').click({force:true})
        cy.get('.admin__data-grid-filters-current').contains('Clear all').click({force:true})
    })
})
