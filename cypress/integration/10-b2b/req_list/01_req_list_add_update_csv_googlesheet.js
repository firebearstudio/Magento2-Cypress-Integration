context('Import Req list Add Update Csv Google Sheet 1', () => {
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
        cy.generalImportSectionWithoutReIndex('Req list Import - add update - csv - google sheet')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('requisition_list');

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('add_update');

        //specify Import Source section
        cy.googlePathSource('https://docs.google.com/spreadsheets/d/1MTPZL72H3ynXVbkVnK5cdt3uWfEZCtPBYV1M97w9eGg/edit#gid=1361515626')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity requisition_list')

        //go to the front-end page
        cy.loginToFrontEndPanel()

        //check that req list were imported
        cy.visit('https://bcb62cd561-254704.nxcli.net/customer/account/')
        cy.visit('https://bcb62cd561-254704.nxcli.net/requisition_list/requisition/index/')
        cy.get('table').contains('Another list')
        cy.get('table').contains('First list name')
        cy.get('table').contains('Second list name')
        cy.get('table').contains('5')
        cy.get('table').contains('6')
        cy.get('table').contains('description')
        cy.get('[data-repeat-index="0"]').find('a',{timeout: 10000}).click()
        cy.get('table').contains('TST-Conf-Simp-S-Gray')
        cy.get('table').contains('24-MB03')
        cy.get('table').contains('24-MB04')
        cy.get('table').contains('24-MB05')
        cy.get('table').contains('24-MB06')
        cy.go('back')
        cy.get('[data-repeat-index="1"]').find('a',{timeout: 10000}).click()
        cy.get('table').contains('24-MB01')
        cy.get('table').contains('24-MB02')
        cy.get('table').contains('24-MB03')
        cy.get('table').contains('24-MB04')
        cy.get('table').contains('24-MB05')
        cy.get('table').contains('24-MB06')
        cy.go('back')
        cy.get('[data-repeat-index="2"]').find('a',{timeout: 10000}).click()
        cy.get('table').contains('TST-Conf-Simp-S-Gray')
        cy.get('table').contains('TST-Conf-Simp-M-Purple')
        cy.get('table').contains('TST-Conf-Simp-L-Gray')
        cy.get('table').contains('24-MB04')
        cy.get('table').contains('24-MB05')
    })
})