context('Import Cart Price Rules', () => {
    it('add update - csv - google sheet - new job', () => {
        //login
        cy.loginToAdminPanel('ce')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSection('Cart Price Rules Import - add update - csv - google sheet')

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
        cy.googlePathSource('https://docs.google.com/spreadsheets/d/13FemIzzexF5koAdQYjbcKscqoCfXyknYWkQkbSZGPsk/edit#gid=73091490')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResult('Entity cart_price_rule')

        //сheck that cart price rules were added
        cy.get('#menu-magento-backend-marketing').find('.item-promo-quote').find('a').as('goToCartPriceRuleGrid')
        cy.get('@goToCartPriceRuleGrid').click({force:true})
        cy.get('tbody').find('.col-name').contains('$4 Luma water bottle (save 70%)',{timeout: 60000})
        cy.get('tbody').find('.col-name').contains('Buy 3 tee shirts and get the 4th free',{timeout: 60000})
        cy.get('tbody').find('.col-name').contains('Spend $50 or more - shipping is free!',{timeout: 60000})
        cy.get('tbody').find('.col-name').contains('20% OFF Ever $200-plus purchase!',{timeout: 60000})
    })
})