
context('Import Products With Related Products 9',{ retries: 3 }, () => {
    it('related products - add update -  csv - file - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Product Import - related/crossell/upsell products')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('catalog_product');
        cy.get('.general_generate_url').find('.admin__actions-switch-label').as('generateUrl')
        cy.get('@generateUrl').click()

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append');

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/products_with_related_upsell_crossell.csv')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 20000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity catalog_product')

        //check that products were imported with related/crossell/upsell products
        cy.get('#menu-magento-catalog-catalog').find('.item-catalog-products').find('a').as('goToProductsGrid')
        cy.get('@goToProductsGrid').click({force:true})
        cy.get('[data-bind="collapsible: {openClass: false, closeOnOuter: false}"]',{timeout: 60000}).find('button').as('filtersButton')
        cy.get('@filtersButton').click({force:true})
        cy.get('[name="sku"]').invoke('val', 'products-remove-related-products').trigger('change',{force:true})
        cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 10000}).as('applyFiltersButton')
        cy.get('@applyFiltersButton').click({force:true})
        cy.get('table').contains('products-remove-related-products1',{timeout: 60000})
        cy.get('table').contains('products-remove-related-products1').click({force:true});
        //checking related products section
        cy.get('[data-index="related"]').find('.fieldset-wrapper-title').click({force:true});
        cy.get('[data-index="related"]').find('table').contains('products-remove-related-products10')
        cy.get('[data-index="related"]').find('table').contains('products-remove-related-products11')
        //checking upsell products section
        cy.get('[data-index="upsell"]').find('.fieldset-wrapper-title').click({force:true});
        cy.get('[data-index="upsell"]').find('table').contains('products-remove-related-products10')
        cy.get('[data-index="upsell"]').find('table').contains('products-remove-related-products11')
        //checking crossell products section
        cy.get('[data-index="crosssell"]').find('.fieldset-wrapper-title').click({force:true});
        cy.get('[data-index="crosssell"]').find('table').contains('products-remove-related-products10')
        cy.get('[data-index="crosssell"]').find('table').contains('products-remove-related-products11')

        //reset active filters in the product grid
        cy.get('#back').click()
        cy.resetActiveFilters()
    })
})
