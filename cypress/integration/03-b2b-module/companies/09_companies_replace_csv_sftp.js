context('Import Companies Replace Csv File 9', () => {
    it('company - csv - file - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSection('Companies Import - replace - csv - file')
        cy.get('[data-index="indexers"]').find('.admin__control-multiselect').as('indexManagement')
        cy.get('@indexManagement').select('customer_grid',{force:true})

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('company');

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('replace');

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/b2b_companies_replace.csv')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResult('Entity company')

        //check that companies have such telephones '67893' '48390' '20214'
        cy.get('#menu-magento-customer-customer').find('.item-company-index').find('a').as('goToCompanyGrid')
        cy.get('@goToCompanyGrid').click({force:true})
        cy.get('[data-bind="text: $col.getLabel($row())"]').contains('67893') 
        cy.get('[data-bind="text: $col.getLabel($row())"]').contains('48390')
        cy.get('[data-bind="text: $col.getLabel($row())"]').contains('20214')   
    })
})