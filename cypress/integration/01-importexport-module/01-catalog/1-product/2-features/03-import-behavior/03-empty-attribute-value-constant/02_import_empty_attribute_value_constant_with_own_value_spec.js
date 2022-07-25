
context('Import Products Empty Attr Value Constant With Own Value 2',{ retries: 0 }, () => {
    it(' empty - attr - value - constant - with - own - value', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Product Import - empty - attr - value - constant - with own value')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('catalog_product',{force:true});

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append',{force:true});

        //fill empty attr constant with your own value
        cy.get('[data-index="_import_empty_attribute_value_constant"]').find('[name="_import_empty_attribute_value_constant"]').clear()
        cy.get('[data-index="_import_empty_attribute_value_constant"]').find('[name="_import_empty_attribute_value_constant"]')
            .type('none')
            .should('have.value', 'none')


        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/product-for-empty-constant.csv')
       
        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //map attributes
        cy.get('.source_data_map_container_replace_default_value').find('select').as('replaceDefaultValue')
        cy.get('@replaceDefaultValue').select('All rows')
        cy.addMappingRowImport('.record-1','weight','weight')
        cy.get('.record-1').find('[name="source_data_map[0][source_data_replace]"]')
            .type('none')
            .should('have.value', 'none')

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity catalog_product')
  
        //check that products were created
        cy.get('#menu-magento-catalog-catalog').find('.item-catalog-products').find('a').as('goToProductsGrid')
        cy.get('@goToProductsGrid').click({force:true})
        cy.get('[data-bind="collapsible: {openClass: false, closeOnOuter: false}"]',{timeout: 10000}).find('button').as('filtersButton')
        cy.get('@filtersButton').click({force:true})
        cy.get('[name="sku"]').invoke('val', 'product-for-empty').trigger('change',{force:true})
        cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 10000}).as('applyFiltersButton')
        cy.get('@applyFiltersButton').click({force:true})
    
        //check that weight doesn't have a value
        cy.get('.admin__data-grid-outer-wrap').contains('product-for-empty-constant',{timeout: 10000})
        cy.get('.admin__data-grid-outer-wrap').contains('product-for-empty-constant').click({force:true});
        cy.get('[data-index="weight"]',{timeout: 10000}).find('[name="product[weight]"]').should('not.have.value','5')

        //reset active filters in the product grid
        cy.get('#back').click({force: true})
        cy.resetActiveFilters({timeout: 10000})
    })
})
