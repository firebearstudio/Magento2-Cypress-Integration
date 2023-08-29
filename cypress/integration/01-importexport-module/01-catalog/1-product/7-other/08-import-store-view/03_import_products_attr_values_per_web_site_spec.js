
context('Import Products Attr Values Web Site 3', () => {
    it('import product attr values per web site', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Product Import Per Web Site')

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
        cy.fileSource('pub/media/importexport/test/product-per-web-site.csv')

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
        cy.get('[name="sku"]').invoke('val', '	product-per-web-si').trigger('change',{force:true})
        cy.get('[name="store_id"]').select('1',{force:true})
        cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 10000}).as('applyFiltersButton')
        cy.get('@applyFiltersButton').click({force:true})

        //check that attributes name, status have specific values per web site
        cy.get('.data-row',{timeout: 10000})
        cy.get('.admin__data-grid-outer-wrap').contains('product-per-web-site',{timeout: 10000});
        cy.get('.admin__data-grid-outer-wrap').contains('product-per-web-site').click({force:true});
        cy.get('[name="product[name]"]',{timeout: 20000}).should('have.value','product-per-web-site default')
        cy.get('[data-index="status"]').find('[name="product[status]"]').should('have.value','2')
        //check data on french store view
        cy.get('#store-change-button').click({force: true})
        cy.get('.dropdown-menu > :nth-child(5) > a').click({force: true})
        cy.get('.confirm > .modal-inner-wrap > .modal-footer > .action-primary').click()
        cy.get('[name="product[name]"]',{timeout: 20000}).should('have.value','product-per-web-site french')
        cy.get('[data-index="status"]').find('[name="product[status]"]').should('have.value','2')
        //check data on german store view
        cy.get('#store-change-button').click({force: true})
        cy.get('.dropdown-menu > :nth-child(6) > a').click({force: true})
        cy.get('.confirm > .modal-inner-wrap > .modal-footer > .action-primary').click()
        cy.get('[name="product[name]"]',{timeout: 20000}).should('have.value','product-per-web-site german')
        cy.get('[data-index="status"]').find('[name="product[status]"]').should('have.value','2')
        //check data on all store views
        cy.get('.store-switcher-all > a').click({force: true})
        cy.get('.confirm > .modal-inner-wrap > .modal-footer > .action-primary').click()
        cy.get('[name="product[name]"]',{timeout: 20000}).should('have.value','product-per-web-site')
        cy.get('[data-index="status"]').find('[name="product[status]"]').should('have.value','2')
        //check data on new store view1
        cy.get('.dropdown-menu > :nth-child(9) > a').click({force: true})
        cy.get('.confirm > .modal-inner-wrap > .modal-footer > .action-primary').click()
        cy.get('[name="product[name]"]',{timeout: 20000}).should('have.value','product-per-web-site new_store_view1')
        cy.get('[data-index="status"]').find('[name="product[status]"]').should('have.value','1')
        //check data on new store view2
        cy.get('.dropdown-menu > :nth-child(10) > a').click({force: true})
        cy.get('.confirm > .modal-inner-wrap > .modal-footer > .action-primary').click()
        cy.get('[name="product[name]"]',{timeout: 20000}).should('have.value','product-per-web-site new_store_view2')
        cy.get('[data-index="status"]').find('[name="product[status]"]').should('have.value','1')
    })
})
