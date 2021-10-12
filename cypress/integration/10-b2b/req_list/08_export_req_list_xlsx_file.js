context('Export Req List Xlsx File 8', () => {
    it('xlsx - sftp - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-export-job').find('a').as('goToExportPageLink')
        cy.get('@goToExportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.get('.general_is_active',{timeout: 60000}).find('.admin__actions-switch-label').as('generalIsActive')
        cy.get('@generalIsActive').click()
        cy.get('.general_title ').find('input')
            .type('Req List Export - xlsx - file')
            .should('have.value', 'Req List Export - xlsx - file')

        //specify Export Settings section
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('requisition_list')

        //specify Export Behavior section
        cy.get('.behavior_behavior_field_file_format').find('select').as('fileFormat')
        cy.get('@fileFormat').select('xlsx');

        //select the Req List Entities: Requisition List, Item
        cy.get('#1').click()
        cy.get('#2').click()
    
        //specify Import Source section
        cy.get('.source_export_source_entity').find('[name="export_source_entity"]').select('file')
        cy.get('[name="export_source_file_file_path"]').type('/var/export/b2b_req_list.xlsx',{force:true})
            .should('have.value', '/var/export/b2b_req_list.xlsx')
        

        //check ftp connection
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('Success! Your connection is ready!',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Export results
        cy.consoleExportResult('Entity requisition_list')
    })
})