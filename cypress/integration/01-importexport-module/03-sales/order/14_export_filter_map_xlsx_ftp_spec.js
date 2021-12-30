
context('Export Orders Filter 14', () => {
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
            .type('Orders Export - filter - xlsx - sftp')
            .should('have.value', 'Orders Export - filter - xlsx - sftp')

        //specify Export Settings section
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('order')

        //specify Export Behavior section
        cy.get('.behavior_behavior_field_file_format').find('select').as('fileFormat')
        cy.get('@fileFormat').select('xlsx');

        //select the Order Entities: Order, Order Items, Addresses
        cy.get('#18').click()
        cy.get('#19').click()
        cy.get('#21').click()

        //specify Import Source section
        cy.specifySftpSource('exportSftp' , '/chroot/home/a0563af8/develop-gold.dev.firebearstudio.com/pub/media/importexport/test/var/import_orders_filter_add_update_sample_data.xlsx')
        
        //check ftp connection
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('Success! Your connection is ready!',{timeout: 60000})

        //filter
        cy.get('.source_filter_map_rows').find('tfoot').as('tfoot')
        cy.get('@tfoot').find('.addButton').click({force:true})
        cy.get('.record-1').find('.source_filter_map_source_filter_entity').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('Order');
        cy.get('.record-1').find('.source_filter_map_source_filter_field').find('select').as('sourceDataExport')
        cy.get('@sourceDataExport').select('status')
        cy.get('.record-1').find('.source_filter_map_source_filter_filter').find('select').as('sourceDataExport')
        cy.get('@sourceDataExport').select('Pending')

        cy.get('.source_filter_map_rows').find('tfoot').as('tfoot')
        cy.get('@tfoot').find('.addButton').click({force:true})
        cy.get('.record-2').find('.source_filter_map_source_filter_entity').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('Items of Order');
        cy.get('.record-2').find('.source_filter_map_source_filter_field').find('select').as('sourceDataExport')
        cy.get('@sourceDataExport').select('sku')
        cy.get('.record-2').find('.source_filter_map_source_filter_filter').find('[name="source_filter_map[text][source_filter_filter]"]')
            .type('Test')
            .should('have.value', 'Test')

        cy.get('.source_filter_map_rows').find('tfoot').as('tfoot')
        cy.get('@tfoot').find('.addButton').click({force:true})
        cy.get('.record-3').find('.source_filter_map_source_filter_entity').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('Addresses');
        cy.get('.record-3').find('.source_filter_map_source_filter_field').find('select').as('sourceDataExport')
        cy.get('@sourceDataExport').select('country_id')
        cy.get('.record-3').find('.source_filter_map_source_filter_filter').find('select').as('sourceDataExport')
        cy.get('@sourceDataExport').select('United States')

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Export results
        cy.consoleExportResult('Entity order')
    })
})
