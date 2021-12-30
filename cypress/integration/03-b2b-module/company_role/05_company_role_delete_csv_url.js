context('Import Company Roles Delete Csv Url 5 ', () => {
    it('delete - csv - url - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSection('Company Roles Import - delete - csv - url')
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
        cy.get('@behaviorBehavior').select('delete');

        //specify Import Source section
        cy.urlSource('https://48a8a91726-1275736.nxcli.net/media/importexport/test/b2b_company_roles_test.csv')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResult('Entity company_role')

        //go to the front-end page
        cy.loginToFrontEndPanel()

        //check that company roles were deleted
        cy.visit('https://bcb62cd561-254704.nxcli.net/customer/account/')
        cy.visit('https://bcb62cd561-254704.nxcli.net/company/role/')
        cy.get('.admin__data-grid-outer-wrap').should('not.contain','Developer')
        cy.get('.admin__data-grid-outer-wrap').should('not.contain','Manager')
        cy.get('.admin__data-grid-outer-wrap').should('not.contain','Tester')
    })
})