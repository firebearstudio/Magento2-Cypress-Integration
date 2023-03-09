
context('Import Custom Options Type Date Time 9', () => {
    it('import custom options - type date time - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click({force:true})

        //specify general section
        cy.generalImportSection('Product Import - custom options - type date time')

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
        cy.fileSource('pub/media/importexport/test/custom-options-type-date-time.csv',{force:true})

        //validate Import file
        cy.get('.source_check_button').click({force:true})
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 20000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResult('Entity catalog_product')

        //check that products were created
        cy.get('#menu-magento-catalog-catalog').find('.item-catalog-products').find('a').as('goToProductsGrid')
        cy.get('@goToProductsGrid').click({force:true})
        cy.get('[data-bind="collapsible: {openClass: false, closeOnOuter: false}"]',{timeout: 10000}).find('button').as('filtersButton')
        cy.get('@filtersButton').click({force:true})
        cy.get('[name="sku"]').invoke('val', 'custom-options-type-date-ti').trigger('change',{force:true})
        cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 10000}).as('applyFiltersButton')
        cy.get('@applyFiltersButton').click({force:true})

        //check the custom options values
        cy.get('.admin__data-grid-outer-wrap').contains('custom-options-type-date-time',{timeout: 10000})
        cy.get('.admin__data-grid-outer-wrap').contains('custom-options-type-date-time').click({force:true});
        cy.get('[data-index="custom_options"]',{timeout: 20000}).find('.fieldset-wrapper-title').click({force:true});
        cy.get('[data-index="options"]').find('[name="product[options][0][title]"]').should('have.value','Custom9')
        cy.get('[data-index="options"]').find('[data-index="type"]').contains('Date & Time')
        cy.get('[data-index="options"]').find('[name="product[options][0][price]"]').should('have.value','1.00')
        cy.get('[data-index="options"]').find('[name="product[options][0][price_type]"]').contains('Fixed')

    })
})
