
context('Import Dymanic Bundle Product 1', () => {
    it('import dynamic bundle product', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click({force:true})

        //specify general section
        cy.generalImportSectionWithoutReIndex('Import Dynamic Bundle Product')

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
        cy.fileSource('pub/media/importexport/test/products_bundle_dynamic.csv')

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
        cy.get('[name="sku"]').invoke('val', 'dynamic_bundle_product').trigger('change',{force:true})
        cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 10000}).as('applyFiltersButton')
        cy.get('@applyFiltersButton').click({force:true})

        //check that bundle product has a bundle selections and attribute values were imported
        cy.get('.admin__data-grid-outer-wrap').contains('Bundle product with dynamic price',{timeout: 20000});
        cy.get('.admin__data-grid-outer-wrap').contains('Bundle product with dynamic price').click({force:true});
        cy.get('[data-index="price_type"]',{timeout: 20000}).find('input').should('have.value','0')
        cy.get('[data-index="sku_type"]').find('input').should('have.value','0')

        //check that shipment type is Separately
        cy.get('[data-index="shipment_type"]').find('select').should('have.value','1')
        //check that bundle sections has two products
        cy.get('[data-index="bundle_selections"]').find('tbody').find('tr').should('have.length', 2)
        //check that data for bundle options were imported successfully
        cy.get('[data-index="bundle_options"]').contains('Bundle Option One1')
        cy.get('[data-index="bundle_options"]').contains('Test Bundle and Grouped - simple product 1')
        cy.get('[data-index="bundle_options"]').contains('Test Bundle and Grouped - simple product 2')
        cy.get('[data-index="bundle_options"]').contains('TST-GrpBnd-Simple-1')
        cy.get('[data-index="bundle_options"]').contains('TST-GrpBnd-Simple-2')
        cy.get('[data-index="bundle_options"]').find('[name="bundle_options[bundle_options][0][title]"]').should('have.value','Bundle Option One1')
        cy.get('[data-index="bundle_options"]').find('[name="bundle_options[bundle_options][0][type]"]').should('have.value','select')
        cy.get('[data-index="bundle_options"]').find('[name="bundle_options[bundle_options][0][required]"]').should('have.value','1')
        cy.get('[data-index="bundle_options"]').find('[name="bundle_options[bundle_options][0][bundle_selections][0][selection_qty]"]').should('have.value','1')
        cy.get('[data-index="bundle_options"]').find('[name="bundle_options[bundle_options][0][bundle_selections][0][selection_can_change_qty]"]').should('have.value','1')
        cy.get('[data-index="bundle_options"]').find('[name="bundle_options[bundle_options][0][bundle_selections][1][selection_qty]"]').should('have.value','1')
        cy.get('[data-index="bundle_options"]').find('[name="bundle_options[bundle_options][0][bundle_selections][1][selection_can_change_qty]"]').should('have.value','1')
    })
})
