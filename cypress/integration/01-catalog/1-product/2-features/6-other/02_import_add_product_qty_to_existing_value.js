
context('Import Products', () => {
    it('import products - add products qty to existing value', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Product Import - add products qty to existing value')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('catalog_product');
        cy.get('[data-index="increase_product_stock_by_qty"]').find('.admin__actions-switch-label').as('increaseProductQty')
        cy.get('@increaseProductQty').click()

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append');

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/product-for-qty-increase.csv')

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
        cy.get('[data-bind="collapsible: {openClass: false, closeOnOuter: false}"]',{timeout: 60000}).find('button').as('filtersButton')
        cy.get('@filtersButton').click({force:true})
        cy.get('[name="sku"]').invoke('val', 'product-for-qty-increase').trigger('change',{force:true})
        cy.get('[name="store_id"]').select('1',{force:true})
        cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 60000}).as('applyFiltersButton')
        cy.get('@applyFiltersButton').click({force:true})

         //check that the products qty is 200
         cy.get('.data-row',{timeout: 60000})
        cy.get('.admin__data-grid-outer-wrap').contains('Product For Qty Increase',{timeout: 60000});
        cy.get('.admin__data-grid-outer-wrap').contains('Product For Qty Increase').click({force:true});
        cy.get('[data-index="qty"]',{timeout: 60000}).find('input').should('have.value','200')

        //delete the product
        cy.get('#back').click()
        cy.get('tbody',{timeout: 60000}).find('[type="checkbox"]').check()
        cy.get('#anchor-content').contains('Actions').click({force:true})
        cy.get('.action-menu-items').contains('Delete').click({force:true})
        cy.get('.modal-inner-wrap').contains('OK').click({force:true})
    })
})
