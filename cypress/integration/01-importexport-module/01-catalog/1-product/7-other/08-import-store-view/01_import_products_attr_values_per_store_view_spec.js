
context('Import Products Attr Values Store View 1', () => {
    it('import product attr values per store view ', () => {
        // //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Product Import Per Store View')

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
        cy.fileSource('pub/media/importexport/test/product-per-store-view.csv')

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
        cy.get('[name="sku"]').invoke('val', 'product-per-store-vi').trigger('change',{force:true})
        cy.get('[name="store_id"]').select('1',{force:true})
        cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 10000}).as('applyFiltersButton')
        cy.get('@applyFiltersButton').click({force:true})

        //check that attributes name, visibility , url key have specific values per store view
        cy.get('.data-row',{timeout: 10000})
        cy.get('.admin__data-grid-outer-wrap').contains('product-per-store-view',{timeout: 10000});
        cy.get('.admin__data-grid-outer-wrap').contains('product-per-store-view').click({force:true});
        cy.get('[name="product[name]"]',{timeout: 20000}).should('have.value','product-per-store-view default')
        cy.get('[name="product[visibility]"]').find('[value="4"]').should('be.selected')
        cy.get('[data-index="search-engine-optimization"]',{timeout: 30000}).find('.fieldset-wrapper-title').click({force:true});
        cy.get('[data-index="url_key"]').find('input').should('have.value', 'product-per-store-view-default');
        //check data on french store view
        cy.get('#store-change-button').click({force: true})
        cy.get('.dropdown-menu > :nth-child(5) > a').click({force: true})
        cy.get('.confirm > .modal-inner-wrap > .modal-footer > .action-primary').click()
        cy.get('[name="product[name]"]',{timeout: 20000}).should('have.value','product-per-store-view French')
        cy.get('[name="product[visibility]"]').find('[value="1"]').should('be.selected')
        cy.get('[data-index="search-engine-optimization"]',{timeout: 30000}).find('.fieldset-wrapper-title').click({force:true});
        cy.get('[data-index="url_key"]').find('input').should('have.value', 'product-per-store-view-french');
        //check data on german store view
        cy.get('#store-change-button').click({force: true})
        cy.get('.dropdown-menu > :nth-child(6) > a').click({force: true})
        cy.get('.confirm > .modal-inner-wrap > .modal-footer > .action-primary').click()
        cy.get('[name="product[name]"]',{timeout: 20000}).should('have.value','product-per-store-view German')
        cy.get('[name="product[visibility]"]').find('[value="3"]').should('be.selected')
        cy.get('[data-index="search-engine-optimization"]',{timeout: 30000}).find('.fieldset-wrapper-title').click({force:true});
        cy.get('[data-index="url_key"]').find('input').should('have.value', 'product-per-store-view-german');
        //check data on all store views
        cy.get('.store-switcher-all > a').click({force: true})
        cy.get('.confirm > .modal-inner-wrap > .modal-footer > .action-primary').click()
        cy.get('[name="product[name]"]',{timeout: 20000}).should('have.value','product-per-store-view')
        cy.get('[name="product[visibility]"]').find('[value="1"]').should('be.selected')
        cy.get('[data-index="search-engine-optimization"]',{timeout: 30000}).find('.fieldset-wrapper-title').click({force:true});
        cy.get('[data-index="url_key"]').find('input').should('have.value', 'product-per-store-view');
    })
})
