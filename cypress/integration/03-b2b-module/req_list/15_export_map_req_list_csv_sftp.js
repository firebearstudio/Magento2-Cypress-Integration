context('Export Req List Map 15', () => {
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
            .type('Req List Export - map - csv - sftp')
            .should('have.value', 'Req List Export - map - csv - sftp')

        //specify Export Settings section
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('requisition_list')

        //specify Export Behavior section
        cy.get('.behavior_behavior_field_file_format').find('select').as('fileFormat')
        cy.get('@fileFormat').select('csv');

        //select the Req Lists Entities: Req List, Item
        cy.get('[data-index="behavior_field_requisition_list"]').find('.admin__field-control > :nth-child(1)').find('input').click()
        cy.get('[data-index="behavior_field_requisition_list"]').find('.admin__field-control > :nth-child(2)').find('input').click()

        //specify Import Source section
        cy.specifySftpSource('exportSftp','/chroot/home/a0563af8/develop-alpha.dev.firebearstudio.com/pub/media/importexport/test/var/b2b_req_list_mapping.csv')

        //check ftp connection
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('Success! Your connection is ready!',{timeout: 60000})

        //mapping
        cy.get('.source_data_map_rows').find('tfoot').as('tfoot')
        cy.get('@tfoot').find('.addButton').click({force:true})
        cy.get('.record-1').find('.source_data_map_source_data_system').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('customer_id');
        cy.get('.record-1').find('.source_data_map_source_data_export').find('input').as('sourceDataImport')
        cy.get('@sourceDataImport')
            .type('_map')
            .should('have.value', 'customer_id_map');

        cy.get('.source_data_map_rows').find('tfoot').as('tfoot')
        cy.get('@tfoot').find('.addButton').click({force:true})
        cy.get('.record-2').find('.source_data_map_source_data_entity').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('Item');
        cy.get('.record-2').find('.source_data_map_source_data_system').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('sku');
        cy.get('.record-2').find('.source_data_map_source_data_export').find('input').as('sourceDataImport')
        cy.get('@sourceDataImport')
            .type('_map')
            .should('have.value', 'item:sku_map');

        cy.get('.source_data_map_rows').find('tfoot').as('tfoot')
        cy.get('@tfoot').find('.addButton').click({force:true})
        cy.get('.record-3').find('.source_data_map_source_data_system').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('description');
        cy.get('.record-3').find('.source_data_map_source_data_export').find('input').as('sourceDataImport')
        cy.get('@sourceDataImport')
            .type('_map')
            .should('have.value', 'description_map')
        cy.get('.record-3').find('.source_data_map_source_data_replace').find('input')
            .type('description map')
            .should('have.value', 'description map')

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Export results
        cy.consoleExportResult('Entity requisition_list')
    })
})