context('Export Stock Sources Qty Filter 12', () => {
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
            .type('Stock Sources Qty Export - csv - sftp')
            .should('have.value', 'Stock Sources Qty Export - csv - sftp')

        //specify Export Settings section
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('stock_sources_qty')

        //specify Export Behavior section
        cy.get('.behavior_behavior_field_file_format').find('select').as('fileFormat')
        cy.get('@fileFormat').select('csv');

        //specify Import Source section
        cy.specifySftpSource('exportSftp','/var/www/alex/files/test/export_stock_sources_qty_filter.csv')

        //check ftp connection
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('Success! Your connection is ready!',{timeout: 60000})

        //filter
        cy.get('.source_filter_map_rows').find('tfoot').as('tfoot')
        cy.get('@tfoot').find('.addButton').click({force:true})
        cy.get('.record-1').find('.source_filter_map_source_filter_field').find('select').as('sourceDataExport')
        cy.get('@sourceDataExport').select('sku')
        cy.get('.record-1').find('.source_filter_map_source_filter_filter').find('[name="source_filter_map[text][source_filter_filter]"]')
            .type('mb')
            .should('have.value', 'mb')

        cy.get('.source_filter_map_rows').find('tfoot').as('tfoot')
        cy.get('@tfoot').find('.addButton').click({force:true})
        cy.get('.record-2').find('.source_filter_map_source_filter_field').find('select').as('sourceDataExport')
        cy.get('@sourceDataExport').select('source_code')
        cy.get('.record-2').find('.source_filter_map_source_filter_filter').find('[name="source_filter_map[text][source_filter_filter]"]')
            .type('new-warehouse')
            .should('have.value', 'new-warehouse')

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Export results
        cy.consoleExportResult('Entity stock_sources_qty')
    })
})