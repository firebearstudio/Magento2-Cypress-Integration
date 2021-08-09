context('Import Review With Associate child review for config and bundle 18', () => {
    it('associate child review for config and bundle - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Review Import - associate child review for config and bundle')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('review');

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append');

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/associate_child_reviews.csv')

        //enable 'Associate child reviews to configurable parent product' and 'Associate... to bundle parent product' features
        cy.get('[data-index="associate_child_review_to_configurable_parent_product"]').find('.admin__actions-switch-label').as('enableAssociateChildReviewConfig')
        cy.get('@enableAssociateChildReviewConfig').click()
        cy.get('[data-index="associate_child_review_to_bundle_parent_product"]').find('.admin__actions-switch-label').as('enableAssociateChildReviewBundle')
        cy.get('@enableAssociateChildReviewBundle').click()
        
        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity review')

        //checking that reviews were imported to the configurable parent and the bundle parent products
        cy.get('#menu-magento-catalog-catalog').find('.item-catalog-products').find('a').as('goToProductsGrid')
        cy.get('@goToProductsGrid').click({force:true})
        cy.get('[data-bind="collapsible: {openClass: false, closeOnOuter: false}"]',{timeout: 60000}).find('button').as('filtersButton')
        cy.get('@filtersButton').click({force:true})
        cy.get('[name="sku"]').invoke('val', 'for-review').trigger('change',{force:true})
        cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 60000}).as('applyFiltersButton')
        cy.get('@applyFiltersButton').click({force:true})
        cy.get('.admin__data-grid-outer-wrap').contains('Config-for-review1',{timeout: 60000})
        cy.get('.admin__data-grid-outer-wrap').contains('Config-for-review1').click({force:true});
        cy.get('[data-index="review"]',{timeout: 10000}).find('.fieldset-wrapper-title').click({force:true});
        cy.get('[data-index="review"]').find('table').contains('Great product (This is a review summary field)')
        cy.get('[data-index="review"]').find('table').contains('Config-for-review1')
        cy.get('#back').as('backButton')
        cy.get('@backButton').click({force:true})
        cy.get('.admin__data-grid-outer-wrap').contains('Config-for-review2',{timeout: 60000})
        cy.get('.admin__data-grid-outer-wrap').contains('Config-for-review2').click({force:true});
        cy.get('[data-index="review"]',{timeout: 10000}).find('.fieldset-wrapper-title').click({force:true});
        cy.get('[data-index="review"]').find('table').contains('Great product (This is a review summary field)')
        cy.get('[data-index="review"]').find('table').contains('Config-for-review2')
        cy.get('#back').as('backButton')
        cy.get('@backButton').click({force:true})
        cy.get('.admin__data-grid-outer-wrap').contains('Bundle-for-review1',{timeout: 60000})
        cy.get('.admin__data-grid-outer-wrap').contains('Bundle-for-review1').click({force:true});
        cy.get('[data-index="review"]',{timeout: 10000}).find('.fieldset-wrapper-title').click({force:true});
        cy.get('[data-index="review"]').find('table').contains('Great product (This is a review summary field)')
        cy.get('[data-index="review"]').find('table').contains('Bundle-for-review1')
        cy.get('#back').as('backButton')
        cy.get('@backButton').click({force:true})
        cy.get('.admin__data-grid-outer-wrap').contains('Bundle-for-review2',{timeout: 60000})
        cy.get('.admin__data-grid-outer-wrap').contains('Bundle-for-review2').click({force:true});
        cy.get('[data-index="review"]',{timeout: 10000}).find('.fieldset-wrapper-title').click({force:true});
        cy.get('[data-index="review"]').find('table').contains('Great product (This is a review summary field)')
        cy.get('[data-index="review"]').find('table').contains('Bundle-for-review2')
    })
})
