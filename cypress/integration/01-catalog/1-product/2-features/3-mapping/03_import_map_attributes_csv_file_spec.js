
context('Import Products', () => {
    it(' map attributes - csv - file - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSection('Product Import - map attributes - csv - file')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('catalog_product',{force:true});

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append',{force:true});

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/products_map.csv')
       
        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //map attributes
        cy.get('.source_data_map_container_replace_default_value').find('select').as('replaceDefaultValue')
        cy.get('@replaceDefaultValue').select('All rows')
        cy.get('.source_data_map_rows').find('.addButton').as('tfoot')
        cy.get('@tfoot').click({force:true})
        cy.get('.record-1').find('.source_data_map_source_data_system').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('sku');
        cy.get('.record-1').find('.source_data_map_source_data_import').find('select').as('sourceDataImport')
        cy.get('@sourceDataImport').select('sku_map');

        cy.get('.source_data_map_rows').find('.addButton').as('tfoot')
        cy.get('@tfoot').click({force:true})
        cy.get('.record-2').find('[data-index="source_data_system"]').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('product_type');
        cy.get('.record-2').find('.source_data_map_source_data_import').find('select').as('sourceDataImport')
        cy.get('@sourceDataImport').select('product_type_map');

        cy.get('.source_data_map_rows').find('.addButton').as('tfoot')
        cy.get('@tfoot').click({force:true})
        cy.get('.record-3').find('[data-index="source_data_system"]').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('weight');
        cy.get('.record-3').find('.source_data_map_source_data_import').find('select').as('sourceDataImport')
        cy.get('@sourceDataImport').select('weight_map');
        cy.get('.record-3').find('.admin__field-control').find('input')
            .type('7')
            .should('have.value', '7')

        cy.get('.source_data_map_rows').find('.addButton').as('tfoot')
        cy.get('@tfoot').click({force:true})
        cy.get('.record-4').find('.source_data_map_source_data_system').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('price');
        cy.get('.record-4').find('.source_data_map_source_data_import').find('select').as('sourceDataImport')
        cy.get('@sourceDataImport').select('price_map');
        cy.get('.record-4').find('.admin__field-control').find('input')
            .type('4')
            .should('have.value', '4')

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResult('Entity products')
  
        //check that products were created
        cy.get('#menu-magento-catalog-catalog').find('.item-catalog-products').find('a').as('goToProductsGrid')
        cy.get('@goToProductsGrid').click({force:true})
        cy.get('[data-bind="collapsible: {openClass: false, closeOnOuter: false}"]',{timeout: 60000}).find('button').as('filtersButton')
        cy.get('@filtersButton').click({force:true})
        cy.get('[name="sku"]').invoke('val', 'tst').trigger('change',{force:true})
        cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 60000}).as('applyFiltersButton')
        cy.get('@applyFiltersButton').click({force:true})
        cy.get('.admin__data-grid-outer-wrap').contains('18 records found',{timeout: 60000})

         //check that mapping chenged weight value
        cy.get('[data-bind="afterRender: $data.setToolbarNode"]').find('[data-bind="i18n: \'Columns\'"]',{timeout: 60000}).as('columnsButton')
        cy.get('@columnsButton').click({force:true})
        cy.get('.admin__action-dropdown-menu-content').find('label').contains('Weight').as('visibleWeightCheckBox')
        cy.get('@visibleWeightCheckBox').click({force:true})
        cy.get('.admin__data-grid-wrap').contains('7.000000',{timeout: 7000})
        cy.get('.admin__data-grid-wrap').contains('4.00',{timeout: 2000})
        cy.get('[data-bind="afterRender: $data.setToolbarNode"]').find('[data-bind="i18n: \'Columns\'"]',{timeout: 60000}).as('columnsButton')
        cy.get('@columnsButton').click({force:true})
        cy.get('.admin__action-dropdown-menu-content').find('label').contains('Weight').as('visibleWeightCheckBox')
        cy.get('@visibleWeightCheckBox').click({force:true})
    })
})
