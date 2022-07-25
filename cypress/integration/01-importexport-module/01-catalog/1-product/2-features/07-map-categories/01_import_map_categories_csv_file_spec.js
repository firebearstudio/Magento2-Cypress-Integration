
context('Import Products Map Categories 1', () => {
    it('map categories - csv - file - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Product Import - map categories - csv - file')

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
        cy.fileSource('pub/media/importexport/test/product_all_types.csv')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //map categories
        cy.get('.source_data_map_container_category_root_category_id').find('.admin__action-multiselect-text').click({force:true})
        cy.get('[data-index="load_categories_button"]').click({force:true})
        cy.get('.source_data_categories_map_rows').find('.addButton').click({force:true})
        cy.get('[data-index="source_data_categories_map"]').find('td.source_data_categories_map_source_category_data_import').click({force:true})
        // cy.get('.source_data_categories_map_source_category_data_import').find('.filter').find('input').click({force:true})
        // cy.get('.source_data_categories_map_source_category_data_import').find('admin__field-control').find('ul').find('li').should('have.value','Default Category/Women/Tops/Hoodies & Sweatshirts').click({force:true})

        // //save and run process
        // cy.get('#save_and_run').click({force:true})
        // cy.get('.run').click({force:true})

        // //check Import results
        // cy.consoleImportResult('Entity products')

        // //check that products were created
        // cy.get('#menu-magento-catalog-catalog').find('.item-catalog-products').find('a').as('goToProductsGrid')
        // cy.get('@goToProductsGrid').click({force:true})
        // cy.get('[data-bind="collapsible: {openClass: false, closeOnOuter: false}"]',{timeout: 60000}).find('button').as('filtersButton')
        // cy.get('@filtersButton').click({force:true})
        // cy.get('[name="sku"]').invoke('val', 'tst').trigger('change',{force:true})
        // cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 60000}).as('applyFiltersButton')
        // cy.get('@applyFiltersButton').click({force:true})
        // cy.get('.admin__data-grid-outer-wrap').contains('18 records found',{timeout: 60000})

        // //check that categories was changed
    })
})
