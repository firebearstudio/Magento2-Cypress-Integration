context('Import Companies', () => {
    it('add update - csv - google sheet - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSection('Companies Import - add update - csv - google sheet')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('company');

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('add_update');

        //specify Import Source section
        cy.googlePathSource('https://docs.google.com/spreadsheets/d/1ASaPIdt8RrZfIP3f1ZmSPG9CQzAYMTNdfzQEhe38bPE/edit#gid=2087652436')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResult('Entity company')

        //check that  companies were added
        cy.get('#menu-magento-customer-customer').find('.item-company-index').find('a').as('goToCompaniesGrid')
        cy.get('@goToCompaniesGrid').click({force:true})
        cy.get('[data-bind="text: $col.getLabel($row())"]').contains('FireBear')
        cy.get('[data-bind="text: $col.getLabel($row())"]').contains('Microsoft')
        cy.get('[data-bind="text: $col.getLabel($row())"]').contains('Apple')
        
    })
})