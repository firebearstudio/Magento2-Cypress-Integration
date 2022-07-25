
context('Import Products Images Labels Update Default 7',{ retries: 0 }, () => {
    it('import - products - images - labels - update - default 7', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Product Import - images labels update - default store view')

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
        cy.fileSource('pub/media/importexport/test/products_updating_image_labels_default.csv')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity catalog_product')
        cy.get('#debug-run').contains('Wrong URL/path used for attribute _media_image').should('not.exist')
        cy.get('#debug-run').contains('Wrong URL/path used for attribute image').should('not.exist')
        cy.get('#debug-run').contains('Wrong URL/path used for attribute small_image').should('not.exist')
        cy.get('#debug-run').contains('Wrong URL/path used for attribute thumbnail').should('not.exist')
        cy.get('#debug-run').contains('Wrong URL/path used for attribute swatch_image').should('not.exist')
  
        //check that products were created
        cy.get('#menu-magento-catalog-catalog').find('.item-catalog-products').find('a').as('goToProductsGrid')
        cy.get('@goToProductsGrid').click({force:true})
        cy.get('[data-bind="collapsible: {openClass: false, closeOnOuter: false}"]',{timeout: 10000}).find('button').as('filtersButton')
        cy.get('@filtersButton').click({force:true})
        cy.get('[name="store_id"]').select('Default Store View',{force: true})
        cy.get('[name="sku"]').invoke('val', 'tst').trigger('change',{force:true})
        cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 10000}).as('applyFiltersButton')
        cy.get('@applyFiltersButton').click({force:true})
    
        //go to the one of the imported products
        cy.get('.admin__data-grid-outer-wrap').contains('TST-Conf-Simp-S-Gray',{timeout: 10000})
        cy.get('.admin__data-grid-outer-wrap').contains('TST-Conf-Simp-S-Gray').click({force:true});

        //check that the labels were updated
        cy.get('[data-index="gallery"]',{timeout: 20000}).find('.fieldset-wrapper-title').click({force:true});
        cy.get('#media_gallery_content').find('.item',{timeout: 10000}).eq(0).as('firstImage')
        cy.get('@firstImage').find('.item-description').contains('New text default')
        cy.get('#media_gallery_content').find('.item').eq(1).as('firstImage')
        cy.get('@firstImage').find('.item-description').contains('New text default')

        //reset active filters in the product grid
        cy.get('#back').click()
        cy.resetActiveFilters({timeout: 10000})
    })
})
