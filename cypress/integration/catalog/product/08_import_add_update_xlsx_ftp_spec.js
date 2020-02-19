
context('Import Products', () => {
    it('add update - xlsx - ftp - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSection('Product Import - add update - xlsx - ftp')

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
        cy.get('@importSourceType').select('xlsx');
        cy.ftpSource('importFtp','/files/products_all_types.xlsx')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResult('Entity catalog_product')

        //check that products were created
        cy.get('#menu-magento-catalog-catalog').find('.item-catalog-products').find('a').as('goToProductsGrid')
        cy.get('@goToProductsGrid').click({force:true})
        cy.get('[data-bind="collapsible: {openClass: false, closeOnOuter: false}"]',{timeout: 60000}).find('button').as('filtersButton')
        cy.get('@filtersButton').click({force:true})
        cy.get('[name="sku"]').invoke('val', 'tst').trigger('change',{force:true})
        cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 60000}).as('applyFiltersButton')
        cy.get('@applyFiltersButton').click({force:true})
        cy.get('.admin__data-grid-outer-wrap').contains('18 records found',{timeout: 60000})

        //check that configurable product has a child's products
        cy.get('.admin__data-grid-outer-wrap').contains('Test Configurable product',{timeout: 60000})
        cy.get('.admin__data-grid-outer-wrap').contains('Test Configurable product').click({force:true});
        cy.get('[data-index="configurable-matrix"]',{timeout: 60000}).find('tbody').find('tr').should('have.length', 9)

        //check that bundle product has a bundle selections
        cy.get('#back').as('backButton')
        cy.get('@backButton').click({force:true})
        cy.get('.data-row',{timeout: 60000})
        cy.get('.admin__data-grid-outer-wrap')
            .contains('Test Bundle product with dynamic price',{timeout: 60000});
        cy.get('.admin__data-grid-outer-wrap').contains('Test Bundle product with dynamic price').click({force:true});
        cy.get('[data-index="bundle_selections"]',{timeout: 60000}).find('tbody').find('tr').should('have.length', 2)
    })
})
