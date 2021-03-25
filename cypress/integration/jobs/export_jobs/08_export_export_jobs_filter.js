context('Export Export Jobs', () => {
    it('xlsx - ftp - new job', () => {
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
            .type('Export Jobs Export - xlsx - ftp')
            .should('have.value', 'Export Jobs Export - xlsx - ftp')

        //specify Export Settings section
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('export_jobs',{force:true})

        //specify Export Behavior section
        cy.get('.behavior_behavior_field_file_format').find('select').as('fileFormat')
        cy.get('@fileFormat').select('csv',{force:true});

        //specify Import Source section
        cy.specifySftpSource('exportSftp' , '/chroot/home/a0563af8/develop-gold.dev.firebearstudio.com/pub/media/importexport/test/var/export_export_jobs.csv')

        //check sftp connection
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('Success! Your connection is ready!',{timeout: 60000})

        //filter
        cy.get('.source_filter_map_rows').find('tfoot').as('tfoot')
        cy.get('@tfoot').find('.addButton').click({force:true})
        cy.get('.record-1').find('.source_filter_map_source_filter_entity').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('Export Jobs');
        cy.get('.record-1').find('.source_filter_map_source_filter_field').find('select').as('sourceDataImport')
        cy.get('@sourceDataImport').select('entity')
        cy.get('.record-1').find('.source_filter_map_source_filter_filter').as('filterValue')
        cy.get('@filterValue').find('[name="source_filter_map[select][source_filter_filter]"]').as('filterSelect')
        cy.get('@filterSelect').select('cms_block',{force:true})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Export results
        cy.consoleExportResult('Entity export_jobs')
    })
})
