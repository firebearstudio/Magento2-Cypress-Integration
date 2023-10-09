
context('Import Orders Only Comment History 32', () => {
    it('only - comment - history - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Orders Import - only comment history')
    
        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('order');

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('add_update');

        //specify Import Source section
        cy.get('.type_file').find('select').as('importSourceType')
        cy.get('@importSourceType').select('csv');
        cy.fileSource('pub/media/importexport/test/orders_only_history_comment_columns.csv')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity order')

        //check that comment history was imported
        cy.get('#menu-magento-sales-sales').find('.item-sales-order').find('a').as('goToOrdersGrid')
        cy.get('@goToOrdersGrid').click({force:true})
        cy.get('table',{timeout: 60000}).contains('1222222222',{timeout: 60000})
        cy.get('table').contains('1222222222').click({force:true});
        cy.get('#sales_order_view_tabs_order_history').click()
        cy.get('.admin__page-section').contains('test comment')
        cy.get('.admin__page-section').contains('test comment 2')
    })
})