
context('Export Orders With Gift Card 34', () => {
    it('export order - gift card - new job', () => {
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
            .type('Orders Export - with gift cards')
            .should('have.value', 'Orders Export - with gift cards')

        //specify Export Settings section
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('order')

        //specify Export Behavior section
        cy.get('.behavior_behavior_field_file_format').find('select').as('fileFormat')
        cy.get('@fileFormat').select('xlsx');

        //select the Order Entities: Order, Order Items, Addresses
        cy.get('[data-index="behavior_field_order"]').find('.admin__field-control > :nth-child(1)').find('input').click()
        cy.get('[data-index="behavior_field_order"]').find('.admin__field-control > :nth-child(2)').find('input').click()
        cy.get('[data-index="behavior_field_order"]').find('.admin__field-control > :nth-child(3)').find('input').click()

        //specify Import Source section
        cy.specifySftpSource('exportSftp' , '/chroot/home/a0563af8/develop-alpha.dev.firebearstudio.com/pub/media/importexport/test/var/import_orders_filter_add_update_sample_data.xlsx')
        
        //check ftp connection
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('Success! Your connection is ready!',{timeout: 60000})

        //filter
        cy.get('.source_filter_map_rows').find('tfoot').as('tfoot')
        cy.get('@tfoot').find('.addButton').click({force:true})
        cy.get('.record-1').find('.source_filter_map_source_filter_entity').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('Order');
        cy.get('.record-1').find('.source_filter_map_source_filter_field').find('select').as('sourceDataExport')
        cy.get('@sourceDataExport').select('increment_id')
        cy.get('.record-1').find('.source_filter_map_source_filter_filter').find('[name="source_filter_map[text][source_filter_filter]"]')
            .type('000000008')
            .should('have.value', '000000008')

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Export results
        cy.consoleExportResult('Entity order')
    })
})
