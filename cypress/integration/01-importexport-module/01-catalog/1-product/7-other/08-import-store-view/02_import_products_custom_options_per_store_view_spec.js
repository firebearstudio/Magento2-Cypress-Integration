
context('Import Products Custom options Store view 2', () => {
    it('import products custom options store view ', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Product Import Custom Options per Store View')

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
        cy.fileSource('pub/media/importexport/test/custom_options_per_store_view.csv')

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
        cy.get('[name="sku"]').invoke('val', 'custom-option-per-stor').trigger('change',{force:true})
        cy.get('[name="store_id"]').select('1',{force:true})
        cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 10000}).as('applyFiltersButton')
        cy.get('@applyFiltersButton').click({force:true})

        //check that attributes custom options names have specific values per store view
        cy.get('.data-row',{timeout: 10000})
        cy.get('.admin__data-grid-outer-wrap').contains('custom-option-per-store',{timeout: 10000});
        cy.get('.admin__data-grid-outer-wrap').contains('custom-option-per-store').click({force:true});
        //default store view
        cy.get('[data-index="custom_options"]',{timeout: 20000}).find('.fieldset-wrapper-title').click({force:true});
        cy.get('[data-index="options"]').find('[name="product[options][0][title]"]').should('have.value','Custom Update default')
        cy.get('[data-index="options"]').find('[name="product[options][1][title]"]').should('have.value','Custom2 Update default')
        cy.get('[data-index="options"]').find('[name="product[options][2][title]"]').should('have.value','Custom3 Update default')
        cy.get('[data-index="options"]').find('[name="product[options][3][title]"]').should('have.value','Custom4 Update default')
        cy.get('[data-index="options"]').find('[name="product[options][3][values][0][title]"]').should('have.value','1 Update default')
        cy.get('[data-index="options"]').find('[name="product[options][3][values][1][title]"]').should('have.value','2 Update default')
        cy.get('[data-index="options"]').find('[name="product[options][4][title]"]').should('have.value','Custom5 Update default')
        cy.get('[data-index="options"]').find('[name="product[options][4][values][0][title]"]').should('have.value','one update default')
        cy.get('[data-index="options"]').find('[name="product[options][4][values][1][title]"]').should('have.value','two update default')
        cy.get('[data-index="options"]').find('[name="product[options][4][values][2][title]"]').should('have.value','three update default')
        cy.get('[data-index="options"]').find('[name="product[options][5][title]"]').should('have.value','Custom6 Update default')
        cy.get('[data-index="options"]').find('[name="product[options][5][values][0][title]"]').should('have.value','check1 update default')
        cy.get('[data-index="options"]').find('[name="product[options][5][values][1][title]"]').should('have.value','check2 update default')
        cy.get('[data-index="options"]').find('[name="product[options][6][title]"]').should('have.value','Custom7 Update default')
        cy.get('[data-index="options"]').find('[name="product[options][6][values][0][title]"]').should('have.value','multi1 update default')
        cy.get('[data-index="options"]').find('[name="product[options][6][values][1][title]"]').should('have.value','multi2 update')
        cy.get('[data-index="options"]').find('[name="product[options][7][title]"]').should('have.value','Custom8 Update default')
        cy.get('[data-index="options"]').find('[name="product[options][8][title]"]').should('have.value','Custom9 Update default')
        cy.get('[data-index="options"]').find('[name="product[options][9][title]"]').should('have.value','Custom10 Update default')
        //French store view
        cy.get('#store-change-button').click({force: true})
        cy.get('.dropdown-menu > :nth-child(5) > a').click({force: true})
        cy.get('.confirm > .modal-inner-wrap > .modal-footer > .action-primary').click()
        cy.get('[data-index="custom_options"]',{timeout: 20000}).find('.fieldset-wrapper-title').click({force:true});
        cy.get('[data-index="options"]').find('[name="product[options][0][title]"]').should('have.value','Custom Update french')
        cy.get('[data-index="options"]').find('[name="product[options][1][title]"]').should('have.value','Custom2 Update french')
        cy.get('[data-index="options"]').find('[name="product[options][2][title]"]').should('have.value','Custom3 Update french')
        cy.get('[data-index="options"]').find('[name="product[options][3][title]"]').should('have.value','Custom4 Update french')
        cy.get('[data-index="options"]').find('[name="product[options][4][title]"]').should('have.value','Custom5 Update french')
        cy.get('[data-index="options"]').find('[name="product[options][5][title]"]').should('have.value','Custom6 Update french')
        cy.get('[data-index="options"]').find('[name="product[options][6][title]"]').should('have.value','Custom7 Update french')
        cy.get('[data-index="options"]').find('[name="product[options][7][title]"]').should('have.value','Custom8 Update french')
        cy.get('[data-index="options"]').find('[name="product[options][8][title]"]').should('have.value','Custom9 Update french')
        cy.get('[data-index="options"]').find('[name="product[options][9][title]"]').should('have.value','Custom10 Update french')
        //German store view 
        cy.get('#store-change-button').click({force: true})
        cy.get('.dropdown-menu > :nth-child(6) > a').click({force: true})
        cy.get('.confirm > .modal-inner-wrap > .modal-footer > .action-primary').click()
        cy.get('[data-index="custom_options"]',{timeout: 20000}).find('.fieldset-wrapper-title').click({force:true});
        cy.get('[data-index="options"]').find('[name="product[options][0][title]"]').should('have.value','Custom Update german')
        cy.get('[data-index="options"]').find('[name="product[options][1][title]"]').should('have.value','Custom2 Update german')
        cy.get('[data-index="options"]').find('[name="product[options][2][title]"]').should('have.value','Custom3 Update german')
        cy.get('[data-index="options"]').find('[name="product[options][3][title]"]').should('have.value','Custom4 Update german')
        cy.get('[data-index="options"]').find('[name="product[options][4][title]"]').should('have.value','Custom5 Update german')
        cy.get('[data-index="options"]').find('[name="product[options][5][title]"]').should('have.value','Custom6 Update german')
        cy.get('[data-index="options"]').find('[name="product[options][6][title]"]').should('have.value','Custom7 Update german')
        cy.get('[data-index="options"]').find('[name="product[options][7][title]"]').should('have.value','Custom8 Update german')
        cy.get('[data-index="options"]').find('[name="product[options][8][title]"]').should('have.value','Custom9 Update german')
        cy.get('[data-index="options"]').find('[name="product[options][9][title]"]').should('have.value','Custom10 Update german')
        //All store views
        cy.get('#store-change-button').click({force: true})
        cy.get('.store-switcher-all > a').click({force: true})
        cy.get('.confirm > .modal-inner-wrap > .modal-footer > .action-primary').click()
        cy.get('[data-index="custom_options"]',{timeout: 20000}).find('.fieldset-wrapper-title').click({force:true});
        cy.get('[data-index="options"]').find('[name="product[options][0][title]"]').should('have.value','Custom Update')
        cy.get('[data-index="options"]').find('[name="product[options][1][title]"]').should('have.value','Custom2 Update')
        cy.get('[data-index="options"]').find('[name="product[options][2][title]"]').should('have.value','Custom3 Update')
        cy.get('[data-index="options"]').find('[name="product[options][3][title]"]').should('have.value','Custom4 Update')
        cy.get('[data-index="options"]').find('[name="product[options][4][title]"]').should('have.value','Custom5 Update')
        cy.get('[data-index="options"]').find('[name="product[options][5][title]"]').should('have.value','Custom6 Update')
        cy.get('[data-index="options"]').find('[name="product[options][6][title]"]').should('have.value','Custom7 Update')
        cy.get('[data-index="options"]').find('[name="product[options][7][title]"]').should('have.value','Custom8 Update')
        cy.get('[data-index="options"]').find('[name="product[options][8][title]"]').should('have.value','Custom9 Update')
        cy.get('[data-index="options"]').find('[name="product[options][9][title]"]').should('have.value','Custom10 Update')
    })
})
