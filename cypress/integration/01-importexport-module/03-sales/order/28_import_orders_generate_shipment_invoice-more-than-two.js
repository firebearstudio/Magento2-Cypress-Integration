
context('Import Orders Generate Shipment Invoice More Then Two 28', () => {
    it('add update - generate - shipment - invoice - more then two - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click({force:true})

        //specify general section
        cy.generalImportSectionWithoutReIndex('Orders Import - generate - shipment - invoice - more then two')

        //enable generate shipment and invoice
        cy.get('[data-index="generate_shipment_by_track"]',{timeout: 60000}).find('.admin__actions-switch-label').as('generateShipment')
        cy.get('@generateShipment').click({force:true})
        cy.get('[data-index="generate_invoice_by_track"]',{timeout: 60000}).find('.admin__actions-switch-label').as('generateInvoice')
        cy.get('@generateInvoice').click({force:true})
        cy.get('[data-index="send_email"]',{timeout: 60000}).find('.admin__actions-switch-label').as('sendEmailAboutShipment')
        cy.get('@sendEmailAboutShipment').click({force:true})

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click({force:true})
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('order',{force:true});

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('add_update',{force:true});

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/generate-shipment-more-then-two.csv')

        //validate Import file
        cy.get('.source_check_button').click({force:true})
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity order')

        //check import results in the Admin
        cy.get('#menu-magento-sales-sales').find('.item-sales-invoice').find('a').as('goToOrdersInvoice')
        cy.get('@goToOrdersInvoice').click({force:true})
        cy.get('.admin__data-grid-outer-wrap').contains('U0000002',{timeout: 60000})
        cy.get('#menu-magento-sales-sales').find('.item-sales-shipment').find('a').as('goToOrdersShipment')
        cy.get('@goToOrdersShipment').click({force:true})
        cy.get('.admin__data-grid-outer-wrap').contains('U0000002',{timeout: 60000})

    })
})
