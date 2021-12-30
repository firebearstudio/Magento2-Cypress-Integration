context('Export Companies Filter 3', () => {
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
            .type('Companies Export - csv - sftp')
            .should('have.value', 'Companies Export - csv - sftp')

        //specify Export Settings section
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('company')

        //specify Export Behavior section
        cy.get('.behavior_behavior_field_file_format').find('select').as('fileFormat')
        cy.get('@fileFormat').select('csv');

        //select the Company Entities: Company, Customer, Customer Advanced
        cy.get('#12').click()
        cy.get('#13').click()
        cy.get('#14').click()

        //specify Import Source section
        cy.specifySftpSource('exportSftp','/chroot/home/a0563af8/develop-gold.dev.firebearstudio.com/pub/media/importexport/test/var/export_company_filter.csv')

        //check ftp connection
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('Success! Your connection is ready!',{timeout: 60000})

        //filter
       cy.get('.source_filter_map_rows').find('tfoot').as('tfoot')
       cy.get('@tfoot').find('.addButton').click({force:true})
       cy.get('.record-1').find('.source_filter_map_source_filter_field').find('select').as('sourceDataExport')
       cy.get('@sourceDataExport').select('company_name')
       cy.get('.record-1').find('.source_filter_map_source_filter_filter').find('[name="source_filter_map[text][source_filter_filter]"]')
            .type('FireBear')
            .should('have.value', 'FireBear')

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Export results
        cy.consoleExportResult('Entity company')
    })
})