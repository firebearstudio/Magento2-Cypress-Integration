
context('Import Сustomers Delete Ods Sftp 9', () => {
    it('delete - ods - sftp - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click({force:true})

        //specify general section
        cy.generalImportSection('Сustomer Import - delete - ods - ftp')
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
        cy.get('.type_file').find('select').as('importSourceType')
        cy.get('@importSourceType').select('ods',{force:true});
        cy.specifySftpSource('importSftp','/chroot/home/a0563af8/develop-gold.dev.firebearstudio.com/pub/media/importexport/test/customers_main.ods')
        
        //validate Import file
        cy.get('.source_check_button').click({force:true})
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResult('Entity customer')
        cy.get('#debug-run').contains('customer with email: roni_cost@example.com')
        cy.get('#debug-run').contains('customer with email: doe@test.com')
        cy.get('#debug-run').contains('customer with email: roe@test.com')

        //check that customer's were deleted
        cy.get('#menu-magento-customer-customer').find('.item-customer-manage').find('a').as('goToCustomerMainGrid')
        cy.get('@goToCustomerMainGrid').click({force:true})
        //check that Veronica Costello was deleted
        cy.get('table',{timeout: 60000}).contains('roni_cost@example.com',{timeout: 60000}).should('not.exist')
        //check that John Doe was deleted
        cy.get('table',{timeout: 60000}).contains('doe@test.com',{timeout: 60000}).should('not.exist')
        //check that Jane Roe was deleted
        cy.get('table',{timeout: 60000}).contains('roe@test.com',{timeout: 60000}).should('not.exist')
    })
})
