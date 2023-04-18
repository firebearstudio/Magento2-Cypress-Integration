
context('Import Сustomer Delete 23', () => {
    it('delete customer for import with increment id - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click({force:true})

        //specify general section
        cy.generalImportSection('Customer Import - delete')
        cy.get('[data-index="indexers"]').find('.admin__control-multiselect').as('indexManagement')
        cy.get('@indexManagement').select('customer_grid',{force:true})

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click({force:true})
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('customer',{force:true});

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('delete',{force:true});

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/customer_angelina.csv')

        //validate Import file
        cy.get('.source_check_button').click({force:true})
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResult('Entity customer')
    })
})
