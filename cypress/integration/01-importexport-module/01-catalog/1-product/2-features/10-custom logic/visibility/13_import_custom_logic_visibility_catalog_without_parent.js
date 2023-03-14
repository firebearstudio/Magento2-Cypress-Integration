
context('Import Products Custom logic Visibility Catalog Without Parent 13',{ retries: 0 }, () => {
    it('custom logic - visibility - Catalog - without parent', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Product Import - custom logic - visibility - catalog  - Without parent')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('catalog_product',{force:true});

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append',{force:true});

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/products_custom_logic_visibility_catalog_without_parent.csv')

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
        cy.get('[name="sku"]').invoke('val', 'visibility-three').trigger('change',{force:true})
        cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 10000}).as('applyFiltersButton')
        cy.get('@applyFiltersButton').click({force:true})

        cy.get('table',{timeout:40000}).contains('visibility-three-S-Gray').parentsUntil('tbody')
            .each(function () {
                cy.contains('Catalog')
            })
        cy.get('table',{timeout:40000}).contains('visibility-three-S-Green').parentsUntil('tbody')
            .each(function () {
                cy.contains('Catalog')
            })
            cy.get('table',{timeout:40000}).contains('visibility-three-S-Purple').parentsUntil('tbody')
            .each(function () {
                cy.contains('Catalog')
            })
            cy.get('table',{timeout:40000}).contains('visibility-three-M-Gray').parentsUntil('tbody')
            .each(function () {
                cy.contains('Catalog')
            })
            cy.get('table',{timeout:40000}).contains('visibility-three-M-Green').parentsUntil('tbody')
            .each(function () {
                cy.contains('Catalog')
            })
            cy.get('table',{timeout:40000}).contains('Configurable Product').parentsUntil('tbody')
            .each(function () {
                cy.contains('Catalog, Search')
            })

        //delete 'visibility-three' products
        cy.get('table').find('.data-grid-checkbox-cell-inner',{timeout: 60000}).click({multiple:true})
        cy.get('.admin__data-grid-header-row').contains('Actions').as('actionsWithMultiple')
        cy.get('@actionsWithMultiple').click({force:true})
        cy.get('.action-menu-items').contains('Delete',{timeout: 60000})
        cy.get('.action-menu-items').contains('Delete').click({force:true})
        cy.get('.modal-footer').find('.action-accept').click({force:true}) 
    })
})
