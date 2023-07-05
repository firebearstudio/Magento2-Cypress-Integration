
context('Import Products Remove Bundle Association 2',{ retries: 0 }, () => {
    it('remove bundle association - add update -  csv - file - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Product Import - remove bundle association - add update - csv - file')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('catalog_product');
        cy.get('[data-index="remove_bundle_product_association"]').find('.admin__actions-switch-label').as('removeBundleAssociation')
        cy.get('@removeBundleAssociation').click()
        cy.get('[data-index="generate_url"]').find('.admin__actions-switch-label').as('generateUrl')
        cy.get('@generateUrl').click()

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append');

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/products-bundle-update-remove-feature.csv')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity catalog_product')

        //check that products were updated
        cy.get('#menu-magento-catalog-catalog').find('.item-catalog-products').find('a').as('goToProductsGrid')
        cy.get('@goToProductsGrid').click({force:true})
        cy.get('[data-bind="collapsible: {openClass: false, closeOnOuter: false}"]',{timeout: 10000}).find('button').as('filtersButton')
        cy.get('@filtersButton').click({force:true})
        cy.get('[name="sku"]').invoke('val', 'TST-GrpBnd-Bundle-Dynamic').trigger('change',{force:true})
        cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 10000}).as('applyFiltersButton')
        cy.get('@applyFiltersButton').click({force:true})

        //check that bundle product has a bundle selections and attribute values were replaced
        cy.get('.admin__data-grid-outer-wrap').contains('TST-GrpBnd-Bundle-DynamicPrice',{timeout: 20000});
        cy.get('.admin__data-grid-outer-wrap').contains('TST-GrpBnd-Bundle-DynamicPrice').click({force:true});
        //check that bundle sections has two products
        cy.get('[data-index="bundle_selections"]',{timeout: 10000}).find('tbody').find('tr').should('have.length', 2)
        //check that data for bundle options were replaced successfully
        cy.get('[data-index="bundle_options"]').contains('Bundle Option One1')
        cy.get('[data-index="bundle_options"]').contains('TST-Conf-Simp-S-Gray')
        cy.get('[data-index="bundle_options"]').contains('TST-Conf-Simp-S-Green')
        //check that there is only one bundle option
        cy.get('[data-index="bundle_options"]').find('[data-index="title"]').should('have.length', 1)
    })
})
