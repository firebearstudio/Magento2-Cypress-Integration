
context('Import Products Videos Youtube 1',{ retries: 0 }, () => {
    it('import - products - videos - youtube', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Product Import - videos - youtube')

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
        cy.fileSource('pub/media/importexport/test/products_only_youtube_videos.csv')
       
        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity catalog_product')
        cy.get('#debug-run').contains('Wrong URL/path used for attribute video_url').should('not.exist')
  
        //check that products were created
        cy.get('#menu-magento-catalog-catalog').find('.item-catalog-products').find('a').as('goToProductsGrid')
        cy.get('@goToProductsGrid').click({force:true})
        cy.get('[data-bind="collapsible: {openClass: false, closeOnOuter: false}"]',{timeout: 10000}).find('button').as('filtersButton')
        cy.get('@filtersButton').click({force:true})
        cy.get('[name="sku"]').invoke('val', 'product-youtube-video').trigger('change',{force:true})
        cy.get('[name="store_id"]').select('1',{force:true})
        cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 10000}).as('applyFiltersButton')
        cy.get('@applyFiltersButton').click({force:true})
    
        cy.get('.admin__data-grid-outer-wrap').contains('product-youtube-video1',{timeout: 10000}).as('productYoutubeVideo')
        cy.get('@productYoutubeVideo').click({force:true});
        //check that images were imported and roles were applied
        cy.get('[data-index="gallery"]',{timeout: 10000}).find('.fieldset-wrapper-title').click({force:true});
        cy.get('#media_gallery_content').find('[src="https://7992002a43-1276088.nxcli.net/media/catalog/product/5/5/55b46bf2bad37ab9cc9d28e97b43dc0481e077fb4b2392913cbeabde38b4ee60.jpeg"]',{timeout: 10000}).click()

        //  cy.get('.multiselect-alt').find('.selected').contains('Base')
        //  cy.get('.multiselect-alt').find('.selected').contains('Small')
        //  cy.get('.multiselect-alt').find('.selected').contains('Thumbnail')
        //  cy.get('.multiselect-alt').find('.selected').contains('Swatch')
        //  cy.get('[aria-labelledby="modal-title-25"]').find('button').click({force:true})

        // //reset active filters in the product grid
        // cy.get('#back').click()
        // cy.resetActiveFilters({timeout: 10000})
    })
})
