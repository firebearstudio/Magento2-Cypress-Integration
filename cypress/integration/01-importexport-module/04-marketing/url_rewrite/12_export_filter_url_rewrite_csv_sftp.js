context('Export Url Rewrites', () => {
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
            .type('Url Rewrites Export - csv - sftp')
            .should('have.value', 'Url Rewrites Export - csv - sftp')

        //specify Export Settings section
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('url_rewrite')

        //specify Export Behavior section
        cy.get('.behavior_behavior_field_file_format').find('select').as('fileFormat')
        cy.get('@fileFormat').select('csv');

        //specify Import Source section
        cy.specifySftpSource('exportSftp' , '/chroot/home/a0563af8/develop-gold.dev.firebearstudio.com/pub/media/importexport/test/export_url_rewrite_filter.csv')

        //check ftp connection
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('Success! Your connection is ready!',{timeout: 60000})

        //filter
       cy.get('.source_filter_map_rows').find('tfoot').as('tfoot')
       cy.get('@tfoot').find('.addButton').click({force:true})
       cy.wait(100)
       cy.get('.source_filter_map_source_filter_field').find('select').as('sourceDataExport')
       cy.get('@sourceDataExport').select('entity_type')
       cy.get('.source_filter_map_source_filter_filter').find('[name="source_filter_map[text][source_filter_filter]"]')
            .type('category')
            .should('have.value', 'category')
    
       cy.get('.source_filter_map_rows').find('tfoot').as('tfoot')
       cy.get('@tfoot').find('.addButton').click({force:true})
       cy.get('.record-2').find('.source_filter_map_source_filter_field').find('select').as('sourceDataExport')
       cy.get('@sourceDataExport').select('entity_id')
       cy.get('.record-2').find('.source_filter_map_source_filter_filter').find('[name="source_filter_map[from][source_filter_filter]"]')
           .type('1')
           .should('have.value', '1')
       cy.get('.record-2').find('.source_filter_map_source_filter_filter').find('[name="source_filter_map[to][source_filter_filter]"]')
           .type('100')
           .should('have.value', '100')

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Export results
        cy.consoleExportResult('Entity url_rewrite')
    })
})