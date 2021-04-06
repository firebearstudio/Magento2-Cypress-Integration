
context('Import Products', () => {
    it('replace - csv - sftp - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSection('Product Import - replace - csv - sftp')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('catalog_product');

        //clear attributes value
        cy.get('.settings_clear_attribute_value').find('.admin__actions-switch-label').as('clearAttrValue')
        cy.get('@clearAttrValue').click()
    

        //were cleared  description , short_description

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append');

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/products_clear_attr_feature.csv')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResult('Entity products')


        //weight,description,short-description
         //check that values were cleared and deleted
        cy.get('#menu-magento-catalog-catalog').find('.item-catalog-products').find('a').as('goToProductsGrid')
        cy.get('@goToProductsGrid').click({force:true})
        cy.get('.admin__data-grid-outer-wrap').contains('Test Configurable product',{timeout: 60000})
        cy.get('.admin__data-grid-outer-wrap').contains('Test Configurable product').click({force:true});
        cy.get('[data-index="content"]',{timeout: 60000}).find('.fieldset-wrapper-title').click({force:true});
        cy.get('#document').find('p').should('be.empty')
        // cy.get('[data-index="container_description"]').find('.admin__field-control').find('button').click()
        // cy.get('.pagebuilder-content-type-wrapper').children('.pagebuilder-content-type').should('not.exist')
        // .should('not.have.pagebuilder-canvas')
        cy.get('#editorproduct_form_short_description').find('#mceu_19').find('#mceu_19-body').find('#mceu_32').find('iframe#product_form_short_description_ifr').should('not.have.value','This is a test simple product that belongs to the test configurable product named Test Configurable Product with SKU: TST-Conf.')
        // cy.get('#product_form_short_description_ifr').click({force:true});
        // cy.get('[data-index="container_short_description"]').find('.product_form_short_description').find('textarea').contains('This is a test simple product that belongs to the test configurable product named Test Configurable Product with SKU: TST-Conf.').should('not.exist')

    })
})
