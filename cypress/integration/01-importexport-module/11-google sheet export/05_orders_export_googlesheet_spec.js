
context('Export Orders GoogleSheet 5',() => {
    it('export - googlesheet - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-export-job').find('a').as('goToExportPageLink')
        cy.get('@goToExportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click({force:true})

        //specify general section
        cy.get('.general_is_active',{timeout: 60000}).find('.admin__actions-switch-label').as('generalIsActive')
        cy.get('@generalIsActive').click({force:true})
        cy.get('.general_title ').find('input')
            .type('Orders Export - googlesheet')
            .should('have.value', 'Orders Export - googlesheet')

        //specify Export Settings section
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('order',{force:true})

        //specify Export Behavior section
        cy.get('.behavior_behavior_field_file_format').find('select').as('fileFormat')
        cy.get('@fileFormat').select('google',{force:true});

        //enable 'Export googlesheet' feature
        cy.get('[name="export_source_google_spreadsheet_id"]').type('1HwvKy2mzrzLZjztmhdhX_oGaHSzqpaT6g7iOqMN9Sbo')
        cy.get('[name="export_source_google_sheet_id"]').type('731925823')

        //upload Google Drive key
        const filepath = 'files/new1-268508-0814a8f755d1.json'
        cy.get('.export_source_google_signing_key_file').find('input[type="file"]').attachFile(filepath)
        cy.get('.file-uploader-filename',{timeout: 10000}).contains('new1-268508-0814a8f755d1.json')

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Export results
        cy.consoleExportResult('Entity order')
    })
})
