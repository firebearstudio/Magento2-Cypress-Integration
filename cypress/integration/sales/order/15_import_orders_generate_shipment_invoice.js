
context('Import Orders', () => {
    it('add update - generate - shipment - invoice - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click({force:true})

        //specify general section
        cy.generalImportSection('Orders Import - add update - generate - shipment - invoice')

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
        cy.googlePathSource('https://docs.google.com/spreadsheets/d/1p4C3iq1F1-nE8LWfY4DpGQy7LkES7jUzHSzA-qqXDdE/edit#gid=833132652')

        //validate Import file
        cy.get('.source_check_button').click({force:true})
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click({force:true})

        //check Import results
        cy.consoleImportResult('Entity order')

        //check that invoice and shipment were generated
        cy.get('#menu-magento-sales-sales').find('.item-sales-invoice').find('a').as('goToOrdersInvoice')
        cy.get('@goToOrdersInvoice').click({force:true})
        cy.get('.admin__data-grid-outer-wrap').contains('U0000002',{timeout: 60000})
        cy.get('#menu-magento-sales-sales').find('.item-sales-shipment').find('a').as('goToOrdersShipment')
        cy.get('@goToOrdersShipment').click({force:true})
        cy.get('.admin__data-grid-outer-wrap').contains('U0000002',{timeout: 60000})
    })
})
