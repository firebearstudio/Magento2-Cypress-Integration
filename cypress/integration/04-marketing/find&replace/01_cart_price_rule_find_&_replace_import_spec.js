
context('Import Cart Price Rule', () => {
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
        cy.generalImportSectionWithoutReIndex('Cart Price Rule Import - find and replace - csv - file')

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
        cy.fileSource('pub/media/importexport/test/cart_price_rule_finad&replace.csv')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //specify find and replace
        cy.get('[data-index="source_data_replacing_container"]').click({force:true})

        //First row
        cy.get('[data-index="source_data_replacing_container"]').find('[data-action="add_new_row"]').as('addNewRow')
        cy.get('@addNewRow').click()
        cy.get('[data-index="data_source_replacing_attribute"]').find('[name="[0]"]',{timeout: 60000}).select('name (Rule Name)',{force:true});
        // Individual words - 0 , Full Value - 1 
        cy.get('[name="source_data_replacing[0][data_source_replacing_target]"]').select('0',{force:true});
        //Yes - 1 , No - 0
        cy.get('[name="source_data_replacing[0][data_source_replacing_is_case_sensitive]"]').select('1',{force:true});
        cy.get('[name="source_data_replacing[0][data_source_replacing_find]"]')
            .type('Test 10%',{force: true})
            .should('have.value', 'Test 10%')
        cy.get('[name="source_data_replacing[0][data_source_replacing_replace]"]')
            .type('New 10%',{force: true})
            .should('have.value', 'New 10%')
        
        //Second row
        cy.get('@addNewRow').click()
        cy.get('[name="[1]"]').select('description (Description)',{force:true});
        cy.get('[name="source_data_replacing[1][data_source_replacing_target]"]').select('0',{force:true});
        cy.get('[name="source_data_replacing[1][data_source_replacing_is_case_sensitive]"]').select('0',{force:true});
        cy.get('[name="source_data_replacing[1][data_source_replacing_find]"]')
            .type('10% off',{force: true})
            .should('have.value', '10% off')
        cy.get('[name="source_data_replacing[1][data_source_replacing_replace]"]')
            .type('10% new',{force: true})
            .should('have.value', '10% new')

        //Third row
        cy.get('@addNewRow').click()
        cy.get('[name="[2]"]').select('is_active (Enable Rule)',{force:true});
        cy.get('[name="source_data_replacing[2][data_source_replacing_target]"]').select('1',{force:true});
        cy.get('[name="source_data_replacing[2][data_source_replacing_is_case_sensitive]"]').select('1',{force:true});
        cy.get('[name="source_data_replacing[2][data_source_replacing_find]"]')
            .type('1',{force: true})
            .should('have.value', '1')
        cy.get('[name="source_data_replacing[2][data_source_replacing_replace]"]')
            .type('0',{force: true})
            .should('have.value', '0')
           
        //Fourth row
        cy.get('@addNewRow').click()
        cy.get('[name="[3]"]').select('discount_amount (Discount Amount)',{force:true});
        cy.get('[name="source_data_replacing[3][data_source_replacing_target]"]').select('1',{force:true});
        cy.get('[name="source_data_replacing[3][data_source_replacing_is_case_sensitive]"]').select('0',{force:true});
        cy.get('[name="source_data_replacing[3][data_source_replacing_find]"]')
            .type('10',{force: true})
            .should('have.value', '10')
        cy.get('[name="source_data_replacing[3][data_source_replacing_replace]"]')
            .type('13',{force: true})
            .should('have.value', '13')
    
        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity cart_price_rule')

        //сheck that values were replaced
        cy.get('#menu-magento-backend-marketing').find('.item-promo-quote').find('a').as('goToCartPriceRuleGrid')
        cy.get('@goToCartPriceRuleGrid').click({force:true})
        cy.get('tbody').find('.col-name').contains('New 10% off - Subtotal equals or greater than 10',{timeout: 60000})
        cy.get('tbody').find('.col-name').contains('New 10% off - Subtotal equals or greater than 10').click()
        cy.get('[data-index="description"]',{timeout: 60000}).find('textarea').should('have.value','10% new whole cart')
        cy.get('[data-index="is_active"]').find('[value="0"]')
        cy.get('[data-index="actions"]').find('.admin__page-nav-item-messages').click({force:true})
        cy.get('[data-index="discount_amount"]').find('input').should('have.value','13')

        //delete imported cart price rule
        cy.get('#delete').click()
        cy.get('.modal-inner-wrap',{timeout: 60000}).find('.action-accept').click()
    })
})
