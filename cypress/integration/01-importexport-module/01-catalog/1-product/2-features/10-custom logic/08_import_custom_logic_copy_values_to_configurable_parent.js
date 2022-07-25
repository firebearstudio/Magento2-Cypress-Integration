
context('Import Products Custom logic Copy Values to Configurable 8',{ retries: 0 }, () => {
    it('custom logic - copy - values - to - configurable', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Product Import - custom logic - copy - values - to - configurable')

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
        cy.fileSource('pub/media/importexport/test/products_custom_logic_different_attributes.csv')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //set custom logic options
        cy.get('.configurable_configurable_switch').find('.admin__actions-switch-label').as('customicLogic')
        cy.get('@customicLogic').click()
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
        cy.get('[name="copy_simple_value[1][copy_simple_value_attributes]"]').select('test1');
        cy.get('@configCopyAttributes').click()
        cy.get('[name="copy_simple_value[2][copy_simple_value_attributes]"]').select('test2');
        cy.get('@configCopyAttributes').click()
        cy.get('[name="copy_simple_value[3][copy_simple_value_attributes]"]').select('test3');
        cy.get('@configCopyAttributes').click()
        cy.get('[name="copy_simple_value[4][copy_simple_value_attributes]"]').select('test4');
        cy.get('@configCopyAttributes').click()
        cy.get('[name="copy_simple_value[5][copy_simple_value_attributes]"]').select('test5');

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
        cy.get('[name="sku"]').invoke('val', 'new').trigger('change',{force:true})
        cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 10000}).as('applyFiltersButton')
        cy.get('@applyFiltersButton').click({force:true})

        //check that configurable product has a child's products
        cy.get('table').contains('Configurable Product',{timeout: 20000})
        cy.get('table').contains('Configurable Product').click({force:true});
        cy.get('[data-index="test1"]',{timeout: 20000}).find('input').should('have.value','test')
        cy.get('[data-index="test2"]').find('select').contains('1').should('be.selected')
        cy.get('[data-index="test3"]').find('select').contains('1').should('be.selected')
        cy.get('[data-index="test4"]').find('select').contains('1').should('be.selected')
        cy.get('[data-index="test5"]').find('select').contains('1').should('be.selected')

        //delete 'new' products
        cy.deleteAllFilterProducts()
    })
})
