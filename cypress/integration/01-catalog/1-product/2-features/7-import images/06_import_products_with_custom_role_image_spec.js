
context('Import Products With Custom Role Image 6',{ retries: 2 }, () => {
    it('import - products - custom - role - image', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Product Import - with custom role image')

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
        cy.fileSource('pub/media/importexport/test/products_with_custom_role_image.csv')
       
        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

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
        cy.get('[name="sku"]').invoke('val', 'product_with_custom_role').trigger('change',{force:true})
        cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 10000}).as('applyFiltersButton')
        cy.get('@applyFiltersButton').click({force:true})
    
        //check that weight doesn't have a value
        cy.get('.admin__data-grid-outer-wrap').contains('product_with_custom_role_image',{timeout: 10000})
        cy.get('.admin__data-grid-outer-wrap').contains('product_with_custom_role_image').click({force:true});

        //check that the custom role was applied and system roles too
        cy.get('[data-index="gallery"]').find('.fieldset-wrapper-title').click({force:true});
        cy.get('#media_gallery_content').find('[src="https://bcb62cd561-254704.nxcli.net/media/catalog/product/e/8/e89bdd6fa5b36b2cd0845b10710c97bd8caf96b4cbd8722d0e90fe348f645438.jpeg"]').click()
        cy.get('.multiselect-alt').find('.selected').contains('Base')
        cy.get('[aria-labelledby="modal-title-25"]').find('button').click({force:true})
        cy.get('#media_gallery_content').find('[src="https://bcb62cd561-254704.nxcli.net/media/catalog/product/9/1/91d542037fa28865ae1af3690af77aa112ba898c0e1b55a42dca20d348b3a1f7.jpeg"]').click()
        cy.get('.multiselect-alt').find('.selected').contains('Small')
        cy.get('.multiselect-alt').find('.selected').contains('Thumbnail')
        cy.get('.multiselect-alt').find('.selected').contains('Swatch')
        cy.get('[aria-labelledby="modal-title-25"]').find('button').click({force:true})
        cy.get('#media_gallery_content').find('[src="https://bcb62cd561-254704.nxcli.net/media/catalog/product/5/1/511eee0409aa302b59788e5a5f76dd79fb7e9e6417b081121ed41fc5e39435aa.jpeg"]').click()
        cy.get('.multiselect-alt').find('.selected').contains('custom_role')
        cy.get('[aria-labelledby="modal-title-25"]').find('button').click({force:true})

        //reset active filters in the product grid
        cy.get('#back').click()
        cy.resetActiveFilters({timeout: 10000})
    })
})
