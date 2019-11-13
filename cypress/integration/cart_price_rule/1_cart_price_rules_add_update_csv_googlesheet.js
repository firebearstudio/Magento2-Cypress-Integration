context('Import Cart Price Rules', () => {
    it('add update - csv - google sheet - new job', () => {
        //login
        cy.visit('http://import.com/admin')
        cy.get('#username')
            .type('admin').should('have.value', 'admin')
        cy.get('#login')
            .type('magento2').should('have.value', 'magento2')
        cy.get('.actions').find('button').as('loginButton')
        cy.get('@loginButton').click()

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.get('.general_is_active',{timeout: 60000}).find('.admin__actions-switch-label').as('generalIsActive')
        cy.get('@generalIsActive').click()
        cy.get('.general_title ').find('input')
            .type('Cart Price Rules Import - add update - csv - google sheet')
            .should('have.value', 'Cart Price Rules Import - add update - csv - google sheet')
        cy.get('.general_reindex').find('.admin__actions-switch-label').as('generalReindex')
        cy.get('@generalReindex').click()

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('cart_price_rule');

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append');

        //specify Import Source section
        cy.get('.import_source').find('select').as('importSource')
        cy.get('@importSource').select('google');
        cy.get('.google_file_path').find('input').as('googleFilePath')
        cy.get('@googleFilePath')
            .invoke('val', 'https://docs.google.com/spreadsheets/d/13FemIzzexF5koAdQYjbcKscqoCfXyknYWkQkbSZGPsk/edit#gid=73091490')
            .trigger('change')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.get('#debug-run').contains('Entity cart_price_rule',{timeout: 60000})
        // cy.get('#debug-run').contains('The import was successful.',{timeout: 600000})
        cy.get('#debug-run').contains('REINDEX completed',{timeout: 600000})
        cy.get('#debug-run').contains('This file is empty').should('not.exist')
        cy.get('#debug-run').contains('Data validation failed').should('not.exist')
        cy.get('#debug-run').contains('Invalid').should('not.exist')
        cy.get('#debug-run').contains('Exception').should('not.exist')

        //сheck that cart price rules were added
        cy.get('#menu-magento-backend-marketing').find('.item-promo-quote').find('a').as('goToCartPriceRuleGrid')
        cy.get('@goToCartPriceRuleGrid').click({force:true})
        cy.get('tbody').find('.col-name').contains('$4 Luma water bottle (save 70%)',{timeout: 60000})
        cy.get('tbody').find('.col-name').contains('Buy 3 tee shirts and get the 4th free',{timeout: 60000})
        cy.get('tbody').find('.col-name').contains('Spend $50 or more - shipping is free!',{timeout: 60000})
        cy.get('tbody').find('.col-name').contains('20% OFF Ever $200-plus purchase!',{timeout: 60000})
    })
})