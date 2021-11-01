
context('Import Products Category Separators 13', () => {
    it('import products category separators', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Product Import - category separators')

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
        cy.fileSource('pub/media/importexport/test/product_category_separator.csv')
        cy.get('[data-index="category_levels_separator"]').find('input').clear()
        cy.get('[data-index="category_levels_separator"]').find('input').type('|').should('have.value','|')
        cy.get('[data-index="categories_separator"]').find('input').clear()
        cy.get('[data-index="categories_separator"]').find('input').type('.').should('have.value','.')


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
        cy.get('[name="sku"]').invoke('val', 'product_category_sep').trigger('change',{force:true})
        cy.get('[name="store_id"]').select('1',{force:true})
        cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 10000}).as('applyFiltersButton')
        cy.get('@applyFiltersButton').click({force:true})

        //check that categories were imported
        cy.get('.data-row',{timeout: 10000})
        cy.get('table').contains('product_category_sep',{timeout: 10000});
        cy.get('table').contains('product_category_sep').click({force:true});
        cy.get('[data-index="container_category_ids"]',{timeout: 20000}).find('.admin__action-multiselect').find('span').contains('Default Category')
        cy.get('[data-index="container_category_ids"]').find('.admin__action-multiselect').find('span').contains('Performance Fabrics')
        cy.get('[data-index="container_category_ids"]').find('.admin__action-multiselect').find('span').contains('Hoodies & Sweatshirts')  
    })
})
