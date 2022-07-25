
context('Import Products For Clear Attr Value 1',{ retries: 0 }, () => {
    it('add update - csv - sftp - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Product Import For Clear Attr Value')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('catalog_product');

        //clear attributes value
        cy.get('.settings_clear_attribute_value').find('.admin__actions-switch-label').as('clearAttrValue')
        cy.get('@clearAttrValue').click()
    

        //were cleared  description , short_description

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append');

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/products_with_values_for_clear_attr.csv')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 20000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity catalog_product')

        //check that color and size attribute have values
        cy.get('#menu-magento-catalog-catalog').find('.item-catalog-products').find('a').as('goToProductsGrid')
        cy.get('@goToProductsGrid').click({force:true})
        cy.get('[data-bind="collapsible: {openClass: false, closeOnOuter: false}"]',{timeout: 60000}).find('button').as('filtersButton')
        cy.get('@filtersButton').click({force:true})
        cy.get('[name="sku"]').invoke('val', 'test-clear').trigger('change',{force:true})
        cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 10000}).as('applyFiltersButton')
        cy.get('@applyFiltersButton').click({force:true})
        cy.get('.admin__data-grid-outer-wrap').contains('test-clear-attribute1',{timeout: 60000})
        cy.get('.admin__data-grid-outer-wrap').contains('test-clear-attribute1').click({force:true});
        cy.get('[data-index="color"]',{timeout: 10000}).find('[data-title="Gray"]').should('be.selected')
        cy.get('[data-index="size"]').find('[data-title="S"]').should('be.selected')

        //reset active filters in the product grid
        cy.get('#back').click({force:true})
        cy.resetActiveFilters()
       
    })
})
