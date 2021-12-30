
context('Import Orders Only Fields From Mapping 22', () => {
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
        cy.generalImportSectionWithoutReIndex('Orders Import - Only fields from mapping')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('order',{force:true});

        //enable Use Only Fields From Mapping
        cy.get('[data-index="use_only_fields_from_mapping"]').find('.admin__actions-switch-label').as('useOnlyMappingFieldsEnabled')
        cy.get('@useOnlyMappingFieldsEnabled').click()

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('add_update',{force:true});

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/orders_for_mapping_checking.csv')
       
        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //map attributes
        cy.get('.source_data_map_container_replace_default_value').find('select').as('replaceDefaultValue')
        cy.get('@replaceDefaultValue').select('All rows')
        cy.addMappingRowImport('.record-1','increment_id','increment_id')
        cy.addMappingRowImport('.record-2','customer_email','customer_email')
        cy.addMappingRowImport('.record-3','status','status')
        cy.get('.record-3').find('[name="source_data_map[2][source_data_replace]"]')
        .type('complete')
        .should('have.value', 'complete')

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity order')
        
        //check if only mapping attributes were updated
        cy.get('#menu-magento-sales-sales').find('.item-sales-order').find('a').as('goToOrdersGrid')
        cy.get('@goToOrdersGrid').click({force:true})
        cy.wait(5000)
        cy.get('.admin__data-grid-outer-wrap',{timeout: 20000}).contains('1333333333').as('findOrder')
        cy.get('@findOrder').click()
        cy.get('#sales_order_view').find('#order_status').contains('Complete')
        cy.get('#sales_order_view').find('.order-billing-address').contains('Roe')
    })
})
