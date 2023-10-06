
context('Import Products With Specific Attr On Fly 3', () => {
    it('import products with specific attr on fly ', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Product Import Creating Specific Attr on Fly Xml')

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
        cy.get('.type_file').find('select').as('importSourceType')
        cy.get('@importSourceType').select('xml',{force:true});
        cy.fileSource('pub/media/importexport/test/products_SUPPORT-15833.xml')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //map attributes
        cy.get('.source_data_map_container_replace_default_value').find('select').as('replaceDefaultValue')
        cy.get('@replaceDefaultValue').select('All rows')
        cy.addMappingRowImport('.record-1','attribute_set_code','')
        cy.get('.record-1').find('[name="source_data_map[0][source_data_replace]"]')
            .type('Default')
            .should('have.value', 'Default')

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity catalog_product')

        //check that attribute was created
        cy.get('#menu-magento-backend-stores').find('.item-catalog-attributes-attributes').find('a').as('goToAttributes')
        cy.get('@goToAttributes').click({force:true})
        cy.get('#attributeGrid_filter_attribute_code')
            .type('best',{force: true})
            .should('have.value', 'best')
            .type('{enter}')
        cy.get('.even > .col-attr-code').contains('best').click()
        //Values of Your Attribute
        cy.get('.ignore-validate > :nth-child(1) > :nth-child(3) > .input-text').should('have.value','EN 374-5:2016 EN ISO 374-1:2016 TYP B. EN 455 1-4, EN 420:2003 + A1:2009')
    })
})
