context('Import Company Roles Add Update Csv GoogleSheet 1', () => {
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
        cy.generalImportSection('Company Roles Import - add update - csv - google sheet')
        cy.get('[data-index="indexers"]').find('.admin__control-multiselect').as('indexManagement')
        cy.get('@indexManagement').select('customer_grid',{force:true})

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('company_role');

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('add_update');

        //specify Import Source section
        cy.googlePathSource('https://docs.google.com/spreadsheets/d/1MTPZL72H3ynXVbkVnK5cdt3uWfEZCtPBYV1M97w9eGg/edit#gid=1210390916')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResult('Entity company_role')

        //check that compnay roles were added
        cy.loginToFrontEndPanel()

        //check that company roles were imported
        cy.visit('https://bcb62cd561-254704.nxcli.net/customer/account/')
        cy.visit('https://bcb62cd561-254704.nxcli.net/company/users/')
        cy.get('.admin__data-grid-outer-wrap').contains('john@gmail.com')
        cy.get('.admin__data-grid-outer-wrap').contains('roe@test.com')
        cy.get('.admin__data-grid-outer-wrap').contains('test@mail.com')
        cy.get('.admin__data-grid-outer-wrap').contains('roni_cost@example.com')
        cy.visit('https://bcb62cd561-254704.nxcli.net/company/role/')
        cy.get('.admin__data-grid-outer-wrap').contains('Developer')
        cy.get('.admin__data-grid-outer-wrap').contains('Manager')
        cy.get('.admin__data-grid-outer-wrap').contains('Tester')
    })
})