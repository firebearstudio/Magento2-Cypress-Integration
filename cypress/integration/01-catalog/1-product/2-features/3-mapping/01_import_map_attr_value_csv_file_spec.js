
context('Import Products Map Attr Value 1',{ retries: 3 }, () => {
    it('map attr value - csv - file - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Product Import - map attr value - csv - file')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('catalog_product');

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append');

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/product_all_types.csv')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //map attribute values
        cy.get('.source_data_attribute_values_map_rows').find('.addButton').click({force:true})
        cy.get('.source_data_attribute_values_map_source_data_attribute_value_system').find('input').as('mapSystemValue')
        cy.get('@mapSystemValue').invoke('val', '888').trigger('change',{force:true})
        cy.get('.source_data_attribute_values_map_source_data_attribute_value_import').find('input').as('mapImportValue')
        cy.get('@mapImportValue').invoke('val', '100').trigger('change',{force:true})
        cy.get('.source_data_attribute_values_map_rows').find('.addButton').click({force:true})
        cy.get('[name="source_data_attribute_values_map[1][source_data_attribute_value_system]"]').invoke('val', 'Product Map Value').trigger('change',{force:true})
        cy.get('[name="source_data_attribute_values_map[1][source_data_attribute_value_import]"]').invoke('val', 'Test Configurable-simple product-S-Gray').trigger('change',{force:true})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity catalog_product')

        //check that products were created
       //check that color and size attribute have values
       cy.get('#menu-magento-catalog-catalog').find('.item-catalog-products').find('a').as('goToProductsGrid')
       cy.get('@goToProductsGrid').click({force:true})
       cy.get('[data-bind="collapsible: {openClass: false, closeOnOuter: false}"]',{timeout: 10000}).find('button').as('filtersButton')
       cy.get('@filtersButton').click({force:true})
       cy.get('[name="sku"]').invoke('val', 'tst').trigger('change',{force:true})
       cy.get('[name="store_id"]').select('1',{force:true})
       cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 10000}).as('applyFiltersButton')
       cy.get('@applyFiltersButton').click({force:true})
       cy.get('.admin__data-grid-outer-wrap').contains('18 records found',{timeout: 10000})

       //check that map value was changed
       cy.get('.admin__data-grid-wrap').contains('888',{timeout: 2000})
       cy.get('.admin__data-grid-wrap').contains('Product Map Value',{timeout: 2000})
       
       //reset active filters in the product grid
       cy.resetActiveFilters()
       
    })
})
