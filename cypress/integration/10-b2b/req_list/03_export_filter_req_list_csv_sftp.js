context('Export Req List', () => {
    it('csv - sftp - new job', () => {
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
            .type('Req List Export - csv - sftp')
            .should('have.value', 'Req List Export - csv - sftp')

        //specify Export Settings section
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('requisition_list')

        //specify Export Behavior section
        cy.get('.behavior_behavior_field_file_format').find('select').as('fileFormat')
        cy.get('@fileFormat').select('csv');

        //select the Req List Entities: Requisition List, Item
        cy.get('#1').click()
        cy.get('#2').click()

        //specify Import Source section
        cy.specifySftpSource('exportSftp','/var/www/alex/files/test/export_requisition_list.csv')

        //check ftp connection
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('Success! Your connection is ready!',{timeout: 60000})

        //filter
       cy.get('.source_filter_map_rows').find('tfoot').as('tfoot')
       cy.get('@tfoot').find('.addButton').click({force:true})
       cy.get('.source_filter_map_source_filter_entity').find('select').as('sourceFilterEntity')
       cy.get('@sourceFilterEntity').select('requisition_list_entity')
       cy.get('.source_filter_map_source_filter_field').find('select').as('sourceDataExport')
       cy.get('@sourceDataExport').select('name')
       cy.get('.source_filter_map_source_filter_filter').find('[name="source_filter_map[text][source_filter_filter]"]')
            .type('First list name')
            .should('have.value', 'First list name')

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Export results
        cy.consoleExportResult('Entity requisition_list')
    })
})