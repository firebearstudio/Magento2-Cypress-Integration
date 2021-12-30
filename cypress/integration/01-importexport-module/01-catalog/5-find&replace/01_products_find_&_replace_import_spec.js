
context('Import Products Find and Replace Csv File 1', () => {
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
        cy.generalImportSectionWithoutReIndex('Product Import - find and replace - csv - file')

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
        cy.googlePathSource('https://docs.google.com/spreadsheets/d/13FemIzzexF5koAdQYjbcKscqoCfXyknYWkQkbSZGPsk/edit#gid=1164219475')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //specify find and replace
        cy.get('[data-index="source_data_replacing_container"]').click({force:true})

        //First row
        cy.get('[data-index="source_data_replacing_container"]').find('[data-action="add_new_row"]').as('addNewRow')
        cy.get('@addNewRow').click()
        cy.get('[data-index="data_source_replacing_attribute"]').find('[name="[0]"]',{timeout: 60000}).select('meta_description',{force:true});
        // Individual words - 0 , Full Value - 1 
        cy.get('[name="source_data_replacing[0][data_source_replacing_target]"]').select('0',{force:true});
        //Yes - 1 , No - 0
        cy.get('[name="source_data_replacing[0][data_source_replacing_is_case_sensitive]"]').select('0',{force:true});
        cy.get('[name="source_data_replacing[0][data_source_replacing_find]"]')
            .type('meta',{force: true})
            .should('have.value', 'meta')
        cy.get('[name="source_data_replacing[0][data_source_replacing_replace]"]')
            .type('New',{force: true})
            .should('have.value', 'New')
        
        //Second row
        cy.get('@addNewRow').click()
        cy.get('[name="[1]"]').select('meta_keywords',{force:true});
        cy.get('[name="source_data_replacing[1][data_source_replacing_target]"]').select('0',{force:true});
        cy.get('[name="source_data_replacing[1][data_source_replacing_is_case_sensitive]"]').select('1',{force:true});
        cy.get('[name="source_data_replacing[1][data_source_replacing_find]"]')
            .type('meta1',{force: true})
            .should('have.value', 'meta1')
        cy.get('[name="source_data_replacing[1][data_source_replacing_replace]"]')
            .type('new1',{force: true})
            .should('have.value', 'new1')

        //Third row
        cy.get('@addNewRow').click()
        cy.get('[name="[2]"]').select('meta_title',{force:true});
        cy.get('[name="source_data_replacing[2][data_source_replacing_target]"]').select('0',{force:true});
        cy.get('[name="source_data_replacing[2][data_source_replacing_is_case_sensitive]"]').select('1',{force:true});
        cy.get('[name="source_data_replacing[2][data_source_replacing_find]"]')
            .type('Test',{force: true})
            .should('have.value', 'Test')
        cy.get('[name="source_data_replacing[2][data_source_replacing_replace]"]')
            .type('New',{force: true})
            .should('have.value', 'New')
           
        //Fourth row
        cy.get('@addNewRow').click()
        cy.get('[name="[3]"]').select('name',{force:true});
        cy.get('[name="source_data_replacing[3][data_source_replacing_target]"]').select('1',{force:true});
        cy.get('[name="source_data_replacing[3][data_source_replacing_is_case_sensitive]"]').select('1',{force:true});
        cy.get('[name="source_data_replacing[3][data_source_replacing_find]"]')
            .type('product-S-Gray',{force: true})
            .should('have.value', 'product-S-Gray')
        cy.get('[name="source_data_replacing[3][data_source_replacing_replace]"]')
            .type('Tst-new-S-Gray',{force: true})
            .should('have.value', 'Tst-new-S-Gray')

        //Fifth row
        cy.get('@addNewRow').click()
        cy.get('[name="[4]"]').select('url_key',{force:true});
        cy.get('[name="source_data_replacing[4][data_source_replacing_target]"]').select('1',{force:true});
        cy.get('[name="source_data_replacing[4][data_source_replacing_is_case_sensitive]"]').select('0',{force:true});
        cy.get('[name="source_data_replacing[4][data_source_replacing_find]"]')
            .type('simp-M-Gray',{force: true})
            .should('have.value', 'simp-M-Gray')
        cy.get('[name="source_data_replacing[4][data_source_replacing_replace]"]')
            .type('tst-new-simp-m-gray',{force: true})
            .should('have.value', 'tst-new-simp-m-gray')
    
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
        cy.get('[name="sku"]').invoke('val', 'tst').trigger('change',{force:true})
        cy.get('[name="store_id"]').select('1',{force:true})
        cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 60000}).as('applyFiltersButton')
        cy.get('@applyFiltersButton').click({force:true})

        //check that values were replaced
        cy.get('.admin__data-grid-outer-wrap').contains('TST-Conf-Simp-S-Gray',{timeout: 60000})
        cy.get('.admin__data-grid-outer-wrap').contains('TST-Conf-Simp-S-Gray').click({force:true});
        cy.get('[data-index="name"]',{timeout: 60000}).find('input').should('have.value', 'Tst-new-S-Gray')
        cy.get('[data-index="search-engine-optimization"]').find('.admin__page-nav-item-messages').click({force:true})
        cy.get('[data-index="meta_title"]').find('input').should('have.value', 'New meta title')
        cy.get('[data-index="meta_keyword"]').find('textarea').should('have.value', 'new1,meta2,meta3')
        //there is a bug with case sensitive : No -> therefore belong comands are commented out
        // cy.get('[data-index="meta_description"]').find('textarea').should('have.value', 'New description goes here.')
        // cy.get('[data-index="url_key"]').find('input').should('have.value', 'tst-new-simp-m-gray')
    })
})
