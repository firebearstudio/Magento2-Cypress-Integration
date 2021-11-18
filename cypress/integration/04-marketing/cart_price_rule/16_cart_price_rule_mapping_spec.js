
context('Import Cart Price Rule Mapping 16', () => {
    it(' mapping - csv - file - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Cart Price Rule Import - mapping - csv - file')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('sales_rule',{force:true});

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append',{force:true});

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/cart_price_rules_mapping.csv')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //map attributes
        cy.get('.source_data_map_container_replace_default_value').find('select').as('replaceDefaultValue')
        cy.get('@replaceDefaultValue').select('All rows')
        cy.addMappingRowImport('.record-1','name','name_map')
        cy.addMappingRowImport('.record-2','description','description_map')
        cy.addMappingRowImport('.record-3','code','code_map')
    
        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity sales_rule')

        //сheck that values were replaced
        cy.get('#menu-magento-backend-marketing').find('.item-promo-quote').find('a').as('goToCartPriceRuleGrid')
        cy.get('@goToCartPriceRuleGrid').click({force:true})
        cy.get('tbody').find('.col-name').contains('Independent Test 53% off - Subtotal equals or greater than 10',{timeout: 60000})
        cy.get('tbody').find('.col-name').contains('Independent Test 53% off - Subtotal equals or greater than 10').click()
        cy.get('[data-index="description"]',{timeout: 60000}).find('textarea').should('have.value','10% off whole cart')

        //delete imported cart price rule
        cy.get('#delete').click()
        cy.get('.modal-inner-wrap',{timeout: 60000}).find('.action-accept').click()
    })
})
