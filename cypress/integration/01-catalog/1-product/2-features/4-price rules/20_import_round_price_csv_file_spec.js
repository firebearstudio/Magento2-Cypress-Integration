
context('Import Products Round Price 20', () => {
    it('round price - csv - file - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Product Import - round price - csv - file')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('catalog_product');

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append',{force:true});

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/product_all_types.csv')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //price rule , round price
        cy.get('.price_rules_container_20_round_up_prices').find('.admin__actions-switch-label').as('roundPrice')
        cy.get('@roundPrice').click()
        cy.get('.price_rules_container_20_round_up_special_price').find('.admin__actions-switch-label').as('roundSpecialPrice')
        cy.get('@roundSpecialPrice').click()

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
        cy.get('[name="sku"]').invoke('val', 'tst').trigger('change',{force:true})
        cy.get('[name="store_id"]').select('1',{force:true})
        cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 60000}).as('applyFiltersButton')
        cy.get('@applyFiltersButton').click({force:true})
        cy.get('.admin__data-grid-outer-wrap').contains('18 records found',{timeout: 60000})

        //check that price was rounded
        cy.get('.admin__data-grid-wrap').contains('68.99',{timeout: 2000})
        cy.get('.admin__data-grid-wrap').contains('14.99',{timeout: 2000})
        cy.get('.admin__data-grid-wrap').contains('17.99',{timeout: 2000})
        cy.get('.admin__data-grid-wrap').contains('21.99',{timeout: 2000})
        cy.get('.admin__data-grid-wrap').contains('14.99',{timeout: 2000})
        cy.get('.admin__data-grid-wrap').contains('123.99',{timeout: 2000})
        cy.get('.admin__data-grid-wrap').contains('Test Configurable-simple product-S-Gray',{timeout: 2000}).click({force:true})
        cy.get('[data-index="container_price"]').find('[data-index="advanced_pricing_button"]').click({force:true})
        cy.get('[name="product[special_price]"]').should('have.value','50.99',{timeout: 6000})
    })
})
