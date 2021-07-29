
context('Import Advanced Pricing Find and Replace 5', () => {
    it(' find and replace - csv - file - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Advanced Pricing Import - find and replace - csv - file')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('advanced_pricing',{force:true});

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append',{force:true});

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/advanced_pricing_find&replace.csv')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //specify find and replace
        cy.get('[data-index="source_data_replacing_container"]').click({force:true})

        //First row
        cy.get('[data-index="source_data_replacing_container"]').find('[data-action="add_new_row"]').as('addNewRow')
        cy.get('@addNewRow').click()
        cy.get('[data-index="data_source_replacing_attribute"]').find('[name="[0]"]',{timeout: 60000}).select('sku (Product Sku)',{force:true});
        // Individual words - 0 , Full Value - 1 
        cy.get('[name="source_data_replacing[0][data_source_replacing_target]"]').select('1',{force:true});
        //Yes - 1 , No - 0
        cy.get('[name="source_data_replacing[0][data_source_replacing_is_case_sensitive]"]').select('1',{force:true});
        cy.get('[name="source_data_replacing[0][data_source_replacing_find]"]')
            .type('adv_product',{force: true})
            .should('have.value', 'adv_product')
        cy.get('[name="source_data_replacing[0][data_source_replacing_replace]"]')
            .type('adv_product1',{force: true})
            .should('have.value', 'adv_product1')
        
        //Second row
        cy.get('@addNewRow').click()
        cy.get('[name="[1]"]').select('tier_price (Tier Price)',{force:true});
        cy.get('[name="source_data_replacing[1][data_source_replacing_target]"]').select('0',{force:true});
        cy.get('[name="source_data_replacing[1][data_source_replacing_is_case_sensitive]"]').select('0',{force:true});
        cy.get('[name="source_data_replacing[1][data_source_replacing_find]"]')
            .type('63',{force: true})
            .should('have.value', '63')
        cy.get('[name="source_data_replacing[1][data_source_replacing_replace]"]')
            .type('77',{force: true})
            .should('have.value', '77')

        //Third row
        cy.get('@addNewRow').click()
        cy.get('[name="[2]"]').select('tier_price_qty (Tier Price Qty)',{force:true});
        cy.get('[name="source_data_replacing[2][data_source_replacing_target]"]').select('0',{force:true});
        cy.get('[name="source_data_replacing[2][data_source_replacing_is_case_sensitive]"]').select('1',{force:true});
        cy.get('[name="source_data_replacing[2][data_source_replacing_find]"]')
            .type('5',{force: true})
            .should('have.value', '5')
        cy.get('[name="source_data_replacing[2][data_source_replacing_replace]"]')
            .type('17',{force: true})
            .should('have.value', '17')
    
        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity advanced_pricing')

        //go to the products grid
        cy.get('#menu-magento-catalog-catalog').find('.item-catalog-products').find('a').as('goToProductsGrid')
        cy.get('@goToProductsGrid').click({force:true})
        cy.get('[data-bind="collapsible: {openClass: false, closeOnOuter: false}"]',{timeout: 60000}).find('button').as('filtersButton')
        cy.get('@filtersButton').click({force:true})
        cy.get('[name="sku"]').invoke('val', 'adv_product1').trigger('change',{force:true})
        cy.get('[name="store_id"]').select('1',{force:true})
        cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 60000}).as('applyFiltersButton')
        cy.get('@applyFiltersButton').click({force:true})
  
        //check that values were replaced
        cy.get('.admin__data-grid-outer-wrap').contains('Adv Product',{timeout: 60000})
        cy.get('.admin__data-grid-outer-wrap').contains('Adv Product').click({force:true});
        cy.get('[data-index="advanced_pricing_button"]',{timeout: 60000}).click({force:true})
        cy.get('[name="product[tier_price][0][price]"]',{timeout: 60000}).should('have.value','77.00')
        cy.get('[name="product[tier_price][0][price_qty]"]',{timeout: 60000}).should('have.value','17')
    })
})
