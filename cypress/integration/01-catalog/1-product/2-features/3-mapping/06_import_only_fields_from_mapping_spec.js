
context('Import Products Only Fields From Mapping 6',{ retries: 3 }, () => {
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
        cy.generalImportSectionWithoutReIndex('Product Import - Only fields from mapping')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('catalog_product',{force:true});

        //enable Use Only Fields From Mapping
        cy.get('[data-index="use_only_fields_from_mapping"]').find('.admin__actions-switch-label').as('useOnlyMappingFieldsEnabled')
        cy.get('@useOnlyMappingFieldsEnabled').click()

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append',{force:true});

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/products_for_mapping_checking.csv')
       
        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //map attributes
        cy.addMappingRowImport('.record-1','sku','sku')
        cy.addMappingRowImport('.record-2','price','price')
        cy.addMappingRowImport('.record-3','url_key','url_key')
        cy.addMappingRowImport('.record-4','attribute_set_code','attribute_set_code')
        cy.addMappingRowImport('.record-5','name','name')
        cy.addMappingRowImport('.record-6','product_websites','product_websites')
        cy.addMappingRowImport('.record-7','qty','qty')
        cy.addMappingRowImport('.record-8','store_view_code','store_view_code')
        cy.addMappingRowImport('.record-9','categories','categories')
        cy.addMappingRowImport('.record-10','meta_description','meta_description')
        cy.addMappingRowImport('.record-11','meta_keyword','meta_keywords')
        cy.addMappingRowImport('.record-12','meta_title','meta_title')
        cy.addMappingRowImport('.record-13','url_key','url_key')
        cy.addMappingRowImport('.record-14','additional_images','additional_images')
        cy.addMappingRowImport('.record-15','description','description')
        cy.addMappingRowImport('.record-16','short_description','short_description')
        cy.addMappingRowImport('.record-17','weight','weight')
        cy.addMappingRowImport('.record-18','additional_attributes','additional_attributes')
        cy.addMappingRowImport('.record-19','product_online','product_online')
        cy.addMappingRowImport('.record-20','image','base_image')
        cy.addMappingRowImport('.record-21','base_image_label','base_image_label')
        cy.addMappingRowImport('.record-22','small_image','small_image')
        cy.addMappingRowImport('.record-23','thumbnail','thumbnail_image')
        cy.addMappingRowImport('.record-24','additional_images','additional_images')
        cy.addMappingRowImport('.record-25','configurable_variations','configurable_variations')
        cy.addMappingRowImport('.record-26','configurable_variation_labels','configurable_variation_labels')

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
        cy.get('[name="sku"]').invoke('val', 'product-only-mapping').trigger('change',{force:true})
        cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 10000}).as('applyFiltersButton')
        cy.get('@applyFiltersButton').click({force:true})

        //check that only mapping attributes were imported
        cy.get('.admin__data-grid-outer-wrap').contains('Main Website',{timeout: 10000})
        cy.get('.admin__data-grid-outer-wrap').contains('product-only-mapping-field1',{timeout: 10000})
        cy.get('.admin__data-grid-outer-wrap').contains('product-only-mapping-field1').click({force:true});
        cy.get('[data-index="color"]').find('[data-title="Gray"]').should('be.selected')
        cy.get('[data-index="size"]').find('[data-title="S"]').should('be.selected')
        cy.get('[data-index="status"]').find('[value="2"]')

        //check that images were imported and roles were applied
        cy.get('[data-index="gallery"]').find('.fieldset-wrapper-title').click({force:true});
        cy.get('#media_gallery_content').find('[src="https://bcb62cd561-254704.nxcli.net/media/catalog/product/e/8/e89bdd6fa5b36b2cd0845b10710c97bd8caf96b4cbd8722d0e90fe348f645438.jpeg"]').click()
        cy.get('.multiselect-alt').find('.selected').contains('Base')
        cy.get('[aria-labelledby="modal-title-25"]').find('button').click({force:true})
        cy.get('#media_gallery_content').find('[src="https://bcb62cd561-254704.nxcli.net/media/catalog/product/9/1/91d542037fa28865ae1af3690af77aa112ba898c0e1b55a42dca20d348b3a1f7.jpeg"]').click({force:true})
        cy.get('.multiselect-alt').find('.selected',{timeout: 10000}).contains('Small')
        cy.get('.multiselect-alt').find('.selected').contains('Thumbnail')
        cy.get('[aria-labelledby="modal-title-25"]').find('button').click({force:true})

        //check that configurable product has a child's products
        cy.get('#back').as('backButton')
        cy.get('@backButton').click({force:true})
        cy.get('.admin__data-grid-outer-wrap').contains('product-only-mapping-field10',{timeout: 10000})
        cy.get('.admin__data-grid-outer-wrap').contains('product-only-mapping-field10').click({force:true});
        cy.get('[data-index="configurable-matrix"]',{timeout: 20000}).find('tbody').find('tr').should('have.length', 9)

        //check that related,upsell,crosell products were Not imported
        cy.get('[data-index="related"]').find('.fieldset-wrapper-title').click({force:true});
        cy.get('[data-index="related"]').not('tbody')
        cy.get('[data-index="related"]').should('not.contain', 'product-only-mapping-field17')
        cy.get('[data-index="related"]').should('not.contain', 'product-only-mapping-field18')
        cy.get('[data-index="related"]').should('not.contain', 'product-only-mapping-field17')
        cy.get('[data-index="related"]').should('not.contain', 'product-only-mapping-field18')
        cy.get('[data-index="upsell"]').should('not.contain', 'product-only-mapping-field17')
        cy.get('[data-index="upsell"]').should('not.contain', 'product-only-mapping-field18')
        cy.get('[data-index="crosssell"]').should('not.contain', 'product-only-mapping-field17')
        cy.get('[data-index="crosssell"]').should('not.contain', 'product-only-mapping-field18')

        //check that custom options were  not imported
        cy.get('#back').as('backButton')
        cy.get('@backButton').click({force:true})
        cy.get('.data-row',{timeout: 20000})
        cy.get('.admin__data-grid-outer-wrap').contains('product-only-mapping-field11',{timeout: 20000})
        cy.get('.admin__data-grid-outer-wrap')
            .contains('product-only-mapping-field11').click({force:true});
        cy.get('[data-index="custom_options"]',{timeout: 20000}).find('.fieldset-wrapper-title').click({force:true});
        cy.get('[data-index="options"]').should('not.contain', 'Custom Yoga Option')

        //reset active filters in the product grid
        cy.get('#back').click()
        cy.resetActiveFilters({timeout: 10000})
    })
})
