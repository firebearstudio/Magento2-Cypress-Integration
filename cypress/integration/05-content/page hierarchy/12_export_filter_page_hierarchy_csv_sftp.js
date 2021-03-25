context('Export Page Hierarchy', () => {
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
            .type('Page Hierarchy Export - csv - sftp')
            .should('have.value', 'Page Hierarchy Export - csv - sftp')

        //specify Export Settings section
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('content_hierarchy')

        //specify Export Behavior section
        cy.get('.behavior_behavior_field_file_format').find('select').as('fileFormat')
        cy.get('@fileFormat').select('csv');

        //specify Import Source section
        cy.specifySftpSource('exportSftp','/var/www/alex/files/test/export_page_hierarchy.csv')

        //check sftp connection
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('Success! Your connection is ready!',{timeout: 60000})

        //filter
        cy.get('.source_filter_map_rows').find('tfoot').as('tfoot')
        cy.get('@tfoot').find('.addButton').click({force:true})
        cy.get('.record-1').find('.source_filter_map_source_filter_field').find('select').as('sourceDataExport')
        cy.get('@sourceDataExport').select('scope')
        cy.get('.record-1').find('.source_filter_map_source_filter_filter').find('select').as('sourceDataImport')
        cy.get('@sourceDataImport').select('Default')

        cy.get('.source_filter_map_rows').find('tfoot').as('tfoot')
        cy.get('@tfoot').find('.addButton').click({force:true})
        cy.get('.record-2').find('.source_filter_map_source_filter_field').find('select').as('sourceDataExport')
        cy.get('@sourceDataExport').select('level')
        cy.get('.record-2').find('.source_filter_map_source_filter_filter').find('[name="source_filter_filter[from][1]"]')
            .type('1')
            .should('have.value', '1')
        cy.get('.record-2').find('.source_filter_map_source_filter_filter').find('[name="source_filter_filter[to][1]"]')
            .type('2')
            .should('have.value', '2')

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Export results
        cy.consoleExportResult('Entity content_hierarchy')
    })
})