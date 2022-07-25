
context('Import Products Images Remove All Images Enabled 2',{ retries: 0 }, () => {
    it('import - products - images - remove - all - images - enabled', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Product Import - remove all images enabled')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('catalog_product',{force:true});

        //enable remove all images 
        cy.get('[data-index="remove_images"]').find('.admin__actions-switch-label').as('removeAllImagesEnabled')
        cy.get('@removeAllImagesEnabled').click()
        cy.get('[data-index="remove_images_dir"]').find('.admin__actions-switch-label').as('removeImagesDirEnabled')
        cy.get('@removeImagesDirEnabled').click()
        cy.get('[data-index="image_resize"]').find('.admin__actions-switch-label').as('resizeImagesEnabled')
        cy.get('@resizeImagesEnabled').click()

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append',{force:true});

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/test_images_second.csv')
       
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
        cy.get('[data-bind="collapsible: {openClass: false, closeOnOuter: false}"]',{timeout: 20000}).find('button').as('filtersButton')
        cy.get('@filtersButton').click({force:true})
        cy.get('[name="sku"]').invoke('val', 'fruit').trigger('change',{force:true})
        cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 10000}).as('applyFiltersButton')
        cy.get('@applyFiltersButton').click({force:true})
    
        //check that weight doesn't have a value
        cy.get('.admin__data-grid-outer-wrap').contains('fruit1',{timeout: 10000})
        cy.get('.admin__data-grid-outer-wrap').contains('fruit1').eq('0').click({force:true});

        //check that old images were deleted and new images were imported and roles were applied
        cy.get('[data-index="gallery"]',{timeout: 10000}).find('.fieldset-wrapper-title').click({force:true});
        cy.get('#media_gallery_content').find('[src="https://7992002a43-1276088.nxcli.net/media/catalog/product/1/e/1e756be2f3bc257db3ae612cd253e21159438399e78487d8687016a5281c4e6c.jpeg"]',{timeout: 10000}).should('not.exist')
        cy.get('#media_gallery_content').find('[src="https://7992002a43-1276088.nxcli.net/media/catalog/product/2/3/2315de17772796a58e28741b6aed243472da1fd48cde623c29af655c2d44e442.jpeg"]').click()
        cy.get('.multiselect-alt').find('.selected').contains('Base')
        cy.get('.multiselect-alt').find('.selected').contains('Small')
        cy.get('.multiselect-alt').find('.selected').contains('Thumbnail')
        cy.get('.multiselect-alt').find('.selected').contains('Swatch')
        cy.get('[aria-labelledby="modal-title-25"]').find('button').click({force:true})

        //reset active filters in the product grid
        cy.get('#back').click({force:true})
        cy.resetActiveFilters({timeout: 10000})
    })
})
