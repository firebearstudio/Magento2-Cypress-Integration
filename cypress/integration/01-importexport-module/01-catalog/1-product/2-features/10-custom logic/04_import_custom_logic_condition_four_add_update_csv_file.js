
context('Import Products Custom logic Condition four 4', () => {
    it('custom logic - condition four - add update -  csv - google sheet - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Product Import - custom logic - condition four - add update - csv - google sheet')

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
        cy.fileSource('pub/media/importexport/test/products_custom_logic_sub_up.csv')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //set custom logic options
        cy.get('.configurable_configurable_switch').find('.admin__actions-switch-label').as('customicLogic')
        cy.get('@customicLogic').click()
        cy.get('.configurable_configurable_create').find('.admin__actions-switch-label').as('configProductEnabled')
        cy.get('@configProductEnabled').click()
        cy.get('.configurable_configurable_type').find('select').as('configType')
        cy.get('@configType').select('sub_up');
        cy.get('.configurable_configurable_field').find('select').as('configField')
        cy.get('@configField').select('sku');
        cy.get('.configurable_configurable_symbols').find('input')
           .type('4')
           .should('have.value', '4')
        cy.get('.configurable_variations_rows').find('.addButton').as('configVariation')
        cy.get('@configVariation').click()
        cy.get('.configurable_variations_configurable_variations_attributes').find('select').as('configVariationAttributeFirst')
        cy.get('@configVariationAttributeFirst').select('color');
        cy.get('.configurable_variations_rows').find('.addButton').as('configVariation')
        cy.get('@configVariation').click()
        cy.get('.configurable_variations_rows').find('.record-2').find('select').as('configVariationAttributeSecond')
        cy.get('@configVariationAttributeSecond').select('size');

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
        cy.get('[name="sku"]').invoke('val', 'Kiwi').trigger('change',{force:true})
        cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 60000}).as('applyFiltersButton')
        cy.get('@applyFiltersButton').click({force:true})
        cy.get('.admin__data-grid-outer-wrap').contains('7 records found',{timeout: 60000})

        //check that configurable product has a child's products
        cy.get('body').contains('Kiwi-config',{timeout: 60000})
        cy.get('body').contains('Kiwi-config').click({force:true});
        cy.get('[data-index="configurable-matrix"]',{timeout: 60000}).find('tbody').find('tr').should('have.length', 6)

        //delete 'kiwi' products
        cy.deleteAllFilterProducts()

        //reset active filters in the product grid
        cy.resetActiveFilters()
    })
})
