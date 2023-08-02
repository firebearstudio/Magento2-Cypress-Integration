
context('Import Products with status 1', () => {
    it('import products with status - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click({force:true})

        //specify general section
        cy.generalImportSectionWithoutReIndex('Product Import - with status')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click({force:true})
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('catalog_product',{force:true});

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append',{force:true});

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/product-update-status-import1.csv',{force:true})

        //validate Import file
        cy.get('.source_check_button').click({force:true})
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 20000})

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
        cy.get('[name="sku"]').invoke('val', 'product-update-status').trigger('change',{force:true})
        cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 10000}).as('applyFiltersButton')
        cy.get('@applyFiltersButton').click({force:true})

        //check the status of products
        cy.get('.admin__data-grid-outer-wrap').contains('product-update-status1',{timeout: 10000})
        cy.get('.admin__data-grid-outer-wrap').contains('product-update-status1').click({force:true});
        cy.get('[data-index="status"]',{timeout: 20000}).find('[type="checkbox"]').should('have.value','2')
        cy.get('#back').as('backButton')
        cy.get('@backButton').click({force:true})
        cy.get('.admin__data-grid-outer-wrap').contains('product-update-status2',{timeout: 10000})
        cy.get('.admin__data-grid-outer-wrap').contains('product-update-status2').click({force:true});
        cy.get('[data-index="status"]',{timeout: 20000}).find('[type="checkbox"]').should('have.value','1')
        cy.get('#back').as('backButton')
        cy.get('@backButton').click({force:true})
        cy.get('.admin__data-grid-outer-wrap').contains('product-update-status3',{timeout: 10000})
        cy.get('.admin__data-grid-outer-wrap').contains('product-update-status3').click({force:true});
        cy.get('[data-index="status"]',{timeout: 20000}).find('[type="checkbox"]').should('have.value','1')
    })
})
