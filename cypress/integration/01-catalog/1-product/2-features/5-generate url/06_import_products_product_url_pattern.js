
context('Import Products',{ retries: 3 }, () => {
    it('product url pattern - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Product Import - product url pattern')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('catalog_product');
        cy.get('[data-index="enable_product_url_pattern"]').find('.admin__actions-switch-label').as('productUrlPatternEnabled')
        //enable Product Url Pattern
        cy.get('@productUrlPatternEnabled').click({force:true})
        cy.get('[data-index="product_url_pattern"]').find('input').as('productUrlPattern')
        cy.get('@productUrlPattern').invoke('val', 'buy_[product_name]_[product_sku]_[product_color]').trigger('change',{force:true})

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append');

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/products_url_pattern.csv')

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
        cy.get('[name="sku"]').invoke('val', 'product-url-pattern').trigger('change',{force:true})
        cy.get('[name="store_id"]').select('1',{force:true})
        cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 10000}).as('applyFiltersButton')
        cy.get('@applyFiltersButton').click({force:true})

        //check that url key was generated
        cy.get('body').contains('product-url-pattern1',{timeout: 20000})
        cy.get('body').contains('product-url-pattern1').click({force:true});
        cy.get('[data-index="search-engine-optimization"]',{timeout: 10000}).find('.fieldset-wrapper-title').click();
        cy.get('[data-index="url_key"]').find('input').should('have.value', 'buy-product-url-pattern1-product-url-pattern1-gray');
        cy.get('.page-actions-buttons').find('#back').click({force:true});
        cy.get('body').contains('product-url-pattern2',{timeout: 20000})
        cy.get('body').contains('product-url-pattern2').click({force:true});
        cy.get('[data-index="search-engine-optimization"]',{timeout: 10000}).find('.fieldset-wrapper-title').click();
        cy.get('[data-index="url_key"]').find('input').should('have.value', 'buy-product-url-pattern2-product-url-pattern2-green');
        cy.get('.page-actions-buttons').find('#back').click({force:true});
        cy.get('body').contains('product-url-pattern3',{timeout: 20000})
        cy.get('body').contains('product-url-pattern3').click({force:true});
        cy.get('[data-index="search-engine-optimization"]',{timeout: 10000}).find('.fieldset-wrapper-title').click();
        cy.get('[data-index="url_key"]').find('input').should('have.value', 'buy-product-url-pattern3-product-url-pattern3-purple');

        //reset active filters 
        cy.get('#back').click()
        cy.resetActiveFilters()
    })
})
