context('Import Req list Add Update Csv Sftp 5', () => {
    it('add update - csv - sftp - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Req list Import - export file - add update - csv - sftp')

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
        cy.specifySftpSource('importSftp','/chroot/home/a0563af8/develop-gold.dev.firebearstudio.com/pub/media/importexport/test/var/export_requisition_list_filter.csv')

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
        cy.get('[data-repeat-index="1"]').find('a',{timeout: 10000}).click()
        cy.get('table').contains('24-MB01')
        cy.get('table').contains('24-MB02')
        cy.get('table').contains('24-MB03')
        cy.get('table').contains('24-MB04')
        cy.get('table').contains('24-MB05')
        cy.get('table').contains('24-MB06')
        cy.get('table').contains('$34.00')
        cy.get('table').contains('$59.00')
        cy.get('table').contains('$38.00')
        cy.get('table').contains('$32.00')
        cy.get('table').contains('$45.00')
    })
})
