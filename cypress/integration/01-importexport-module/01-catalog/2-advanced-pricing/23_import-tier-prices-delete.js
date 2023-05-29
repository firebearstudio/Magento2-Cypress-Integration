context('Import Advanced Pricing delete 23', () => {
    it('delete behavior - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Advanced Pricing Import - delete - behavior 23')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('advanced_pricing',{force:true});

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('delete',{force:true});

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/tier-prices-behavior.csv')
       
        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity advanced_pricing')

       //check that products were created
       cy.get('#menu-magento-catalog-catalog').find('.item-catalog-products').find('a').as('goToProductsGrid')
       cy.get('@goToProductsGrid').click({force:true})
       cy.get('[data-bind="collapsible: {openClass: false, closeOnOuter: false}"]',{timeout: 10000}).find('button').as('filtersButton')
       cy.get('@filtersButton').click({force:true})
       cy.get('[name="sku"]').invoke('val', 'tier-prices-produ').trigger('change',{force:true})
       cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 10000}).as('applyFiltersButton')
       cy.get('@applyFiltersButton').click({force:true})

       //check tier prices values
       cy.get('.admin__data-grid-outer-wrap').contains('tier-prices-product',{timeout: 10000})
       cy.get('.admin__data-grid-outer-wrap').contains('tier-prices-product').click({force:true});
       cy.get('[data-index="container_price"]',{timeout: 10000}).contains('Advanced Pricing').click()
       cy.get('tbody').find('tr').should('have.length', 0)
    })
})
