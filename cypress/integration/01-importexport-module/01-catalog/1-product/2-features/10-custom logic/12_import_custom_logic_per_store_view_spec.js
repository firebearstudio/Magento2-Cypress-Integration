
context('Import Custom logic per Store View 12', () => {
    it('import custom logic per store view ', () => {
        // //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Product Custom logic Per Store View')

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
        cy.fileSource('pub/media/importexport/test/custom-logic-per-store-view.csv')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //set custom logic options
        cy.get('.configurable_configurable_switch').find('.admin__actions-switch-label').as('customicLogic')
        cy.get('@customicLogic').click()
        cy.get('.configurable_configurable_create').find('.admin__actions-switch-label').as('configProductEnabled')
        cy.get('@configProductEnabled').click()
        cy.get('.configurable_configurable_type').find('select').as('configType')
        cy.get('@configType').select('field');
        cy.get('.configurable_configurable_field').find('select').as('configField')
        cy.get('@configField').select('group');
        cy.get('.configurable_variations_rows').find('.addButton').as('configVariation')
        cy.get('@configVariation').click()
        cy.get('.configurable_variations_configurable_variations_attributes').find('select').as('configVariationAttributeFirst')
        cy.get('@configVariationAttributeFirst').select('color');
        cy.get('@configVariation').click()
        cy.get('.configurable_variations_rows').find('.record-2').find('select').as('configVariationAttributeSecond')
        cy.get('@configVariationAttributeSecond').select('size');

        //set product attributes to copy value 
        cy.get('[data-index="copy_simple_value"]').find('.addButton').as('configCopyAttributes')
        cy.get('@configCopyAttributes').click()
        cy.get('[name="copy_simple_value[0][copy_simple_value_attributes]"]').select('name');
        cy.get('@configCopyAttributes').click()

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
        cy.get('[name="sku"]').invoke('val', 'custom-logic-per-store-vie').trigger('change',{force:true})
        cy.get('[name="store_id"]').select('1',{force:true})
        cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 10000}).as('applyFiltersButton')
        cy.get('@applyFiltersButton').click({force:true})

        //check that the attribute 'name' have specific values per store view
        cy.get('table').contains('Configurable Product',{timeout: 20000})
        cy.get('table').contains('Configurable Product').click({force:true});
        cy.get('[name="product[name]"]',{timeout: 20000}).should('have.value','custom-logic-per-store-view-s-gray default')
        //check data on german store view
        cy.get('#store-change-button').click({force: true})
        cy.get('.dropdown-menu > :nth-child(6) > a').click({force: true})
        cy.get('.confirm > .modal-inner-wrap > .modal-footer > .action-primary').click()
        cy.get('[name="product[name]"]',{timeout: 20000}).should('have.value','custom-logic-per-store-view-s-gray german')
        //check data on all store views
        cy.get('.store-switcher-all > a').click({force: true})
        cy.get('.confirm > .modal-inner-wrap > .modal-footer > .action-primary').click()
        cy.get('[name="product[name]"]',{timeout: 20000}).should('have.value','custom-logic-per-store-view-s-gray')
    })
})
