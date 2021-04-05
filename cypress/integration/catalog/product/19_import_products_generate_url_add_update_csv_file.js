
context('Import Products', () => {
    it('generate url duplicate - add update -  csv - file - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSection('Product Import - generate url duplicate - add update - csv - file')
        cy.get('.general_generate_url').find('.admin__actions-switch-label').as('generateUrl')
        cy.get('@generateUrl').click()

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
        cy.get('.type_file').find('select').as('importSourceType')
        cy.get('@importSourceType').select('csv');
        cy.fileSource('pub/media/importexport/test/products_generate_if_duplicate.csv')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResult('Entity products')

        //check that products were created
        cy.get('#menu-magento-catalog-catalog').find('.item-catalog-products').find('a').as('goToProductsGrid')
        cy.get('@goToProductsGrid').click({force:true})
        cy.get('[data-bind="collapsible: {openClass: false, closeOnOuter: false}"]',{timeout: 60000}).find('button').as('filtersButton')
        cy.get('@filtersButton').click({force:true})
        cy.get('[name="sku"]').invoke('val', 'tst').trigger('change',{force:true})
        cy.get('[name="store_id"]').select('1',{force:true})
        cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 60000}).as('applyFiltersButton')
        cy.get('@applyFiltersButton').click({force:true})

        //check that url key was generated
        cy.get('.admin__data-grid-wrap').contains('o',{timeout: 2000})
        cy.get('.admin__data-grid-wrap').contains('t-tst-conf-simp-s-green',{timeout: 2000})
        cy.get('.admin__data-grid-wrap').contains('test-configurable-simple-product-s-purple-tst-conf-simp-s-purple',{timeout: 2000})
        cy.get('.admin__data-grid-wrap').contains('test-configurable-simple-product-m-gray-tst-conf-simp-m-gray',{timeout: 2000})
        cy.get('.admin__data-grid-wrap').contains('test-configurable-product-tst-conf',{timeout: 2000})
        cy.get('.admin__data-grid-wrap').contains('test-grouped-product-tst-grpbnd-grouped',{timeout: 2000})
        cy.get('.admin__data-grid-wrap').contains('test-bundle-product-with-dynamic-price-tst-grpbnd-bundle-dynamicprice',{timeout: 2000})
        cy.get('.admin__data-grid-wrap').contains('test-downloadable-product-tst-dwnl-1',{timeout: 2000})
    })
})
