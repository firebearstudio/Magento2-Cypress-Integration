
context('Import Сustomer Addresses Add/Update Xlsx Sftp Using Export File', () => {
    it('add update - export file - xlsx - sftp - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click({force:true})

        //specify general section
        cy.generalImportSection('Customer Address Import - export file - add update - xlsx - sftp')
        cy.get('[data-index="indexers"]').find('.admin__control-multiselect').as('indexManagement')
        cy.get('@indexManagement').select('customer_grid',{force:true})

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click({force:true})
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('customer_address',{force:true});

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('add_update',{force:true});

        //specify Import Source section
        cy.get('.type_file').find('select').as('importSourceType')
        cy.get('@importSourceType').select('xlsx',{force:true});
        cy.specifySftpSource('importSftp','/chroot/home/a0563af8/develop-gold.dev.firebearstudio.com/pub/media/importexport/test/var/customer_addresses.xlsx')

        //validate Import file
        cy.get('.source_check_button').click({force:true})
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResult('Entity customer_address')
        cy.get('#debug-run').contains('address with email: roni_cost@example.com')
        cy.get('#debug-run').contains('address with email: doe@test.com')
        cy.get('#debug-run').contains('address with email: roe@test.com')

        //check that customer addresses' values were imported
        cy.get('#menu-magento-customer-customer').find('.item-customer-manage').find('a').as('goToCustomerMainGrid')
        cy.get('@goToCustomerMainGrid').click({force:true})
        //check that the data for Veronica Costello has been imported.
        cy.get('table',{timeout: 60000}).contains('roni_cost@example.com',{timeout: 60000})
        cy.get('table').contains('(555) 229-3326')
        cy.get('table').contains('49628-7978')
        cy.get('table').contains('United States')
        cy.get('table').contains('Michigan')
        //check that the data for John Doe has been imported.
        cy.get('table',{timeout: 60000}).contains('doe@test.com',{timeout: 60000})
        cy.get('table').contains('5555555555')
        cy.get('table').contains('12345')
        cy.get('table').contains('Germany')
        cy.get('table').contains('EU555555555')
        //check that the data for Jane Roe has been imported.
        cy.get('table',{timeout: 60000}).contains('roe@test.com',{timeout: 60000})
        cy.get('table').contains('5555555556')
        cy.get('table').contains('12345')
        cy.get('table').contains('Germany')
    })
})
