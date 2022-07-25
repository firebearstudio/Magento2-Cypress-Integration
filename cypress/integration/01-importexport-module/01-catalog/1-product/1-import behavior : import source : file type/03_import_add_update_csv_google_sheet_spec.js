
context('Import Products Csv GoogleSheet 3', () => {
    it('add update - csv - google sheet - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click({force:true})

        //specify general section
        cy.generalImportSection('Product Import - add update - csv - google sheet')

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
        cy.googlePathSource('https://docs.google.com/spreadsheets/d/13FemIzzexF5koAdQYjbcKscqoCfXyknYWkQkbSZGPsk/edit#gid=1164219475')

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
        cy.get('[name="sku"]').invoke('val', 'tst').trigger('change',{force:true})
        cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 10000}).as('applyFiltersButton')
        cy.get('@applyFiltersButton').click({force:true})
        cy.get('.admin__data-grid-outer-wrap').contains('18 records found',{timeout: 10000})

        //check that configurable product has a child's products
        cy.get('.admin__data-grid-outer-wrap').contains('Test Configurable product',{timeout: 10000})
        cy.get('.admin__data-grid-outer-wrap').contains('Test Configurable product').click({force:true});
        cy.get('[data-index="configurable-matrix"]',{timeout: 20000}).find('tbody').find('tr').should('have.length', 9)

        //check that bundle product has a bundle selections
        cy.get('#back').as('backButton')
        cy.get('@backButton').click({force:true})
        cy.get('.data-row',{timeout: 20000})
        cy.get('.admin__data-grid-outer-wrap')
            .contains('Test Bundle product with dynamic price',{timeout: 20000});
        cy.get('.admin__data-grid-outer-wrap').contains('Test Bundle product with dynamic price').click({force:true});
        cy.get('[data-index="bundle_selections"]',{timeout: 20000}).find('tbody').find('tr').should('have.length', 2)

        //check that custom options were created
        cy.get('#back').as('backButton')
        cy.get('@backButton').click({force:true})
        cy.get('.data-row',{timeout: 20000})
        cy.get('.admin__data-grid-outer-wrap').contains('Test Bundle and Grouped - simple product 1',{timeout: 20000})
        cy.get('.admin__data-grid-outer-wrap')
            .contains('Test Bundle and Grouped - simple product 1').click({force:true});
        cy.get('[data-index="custom_options"]',{timeout: 20000}).find('.fieldset-wrapper-title').click({force:true});
        cy.get('[data-index="options"]').find('[data-index="values"]').find('tbody').find('tr').should('have.length', 3)

        //reset active filters in the product grid
        cy.get('#back').click()
        cy.resetActiveFilters()
    })
})
