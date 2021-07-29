context('Export Customer Finances Mapping 12', () => {
    it('ods - sftp - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-export-job').find('a').as('goToExportPageLink')
        cy.get('@goToExportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click({force:true})

        //specify general section
        cy.get('.general_is_active',{timeout: 60000}).find('.admin__actions-switch-label').as('generalIsActive')
        cy.get('@generalIsActive').click({force:true})
        cy.get('.general_title ').find('input')
            .type('Customers Finances Export - mapping - ods - sftp')
            .should('have.value', 'Customers Finances Export - mapping - ods - sftp')

        //specify Export Settings section
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('customer_finance',{force:true})

        //specify Export Behavior section
        cy.get('.behavior_behavior_field_file_format').find('select').as('fileFormat')
        cy.get('@fileFormat').select('ods',{force:true});

        //specify Export Source section
        cy.specifySftpSource('exportSftp' , '/chroot/home/a0563af8/develop-gold.dev.firebearstudio.com/pub/media/importexport/test/var/export_customer_finances_add_update_map.ods')
        
        //check ftp connection
        cy.get('.source_check_button').click({force:true})
        cy.get('.fieldset_source').contains('Success! Your connection is ready!',{timeout: 60000})

        //mapping
        cy.get('.source_data_map_rows').find('tfoot').as('tfoot')
        cy.get('@tfoot').find('.addButton').click({force:true})
        cy.get('.record-1').find('.source_data_map_source_data_system').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('_email');
        cy.get('.record-1').find('.source_data_map_source_data_export').find('input').as('sourceDataImport')
        cy.get('@sourceDataImport')
            .type('_map')
            .should('have.value', '_email_map');

        cy.get('.source_data_map_rows').find('tfoot').as('tfoot')
        cy.get('@tfoot').find('.addButton').click({force:true})
        cy.get('.record-2').find('.source_data_map_source_data_system').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('_website');
        cy.get('.record-2').find('.source_data_map_source_data_export').find('input').as('sourceDataImport')
        cy.get('@sourceDataImport')
            .type('_map')
            .should('have.value', '_website_map');

        cy.get('.source_data_map_rows').find('tfoot').as('tfoot')
        cy.get('@tfoot').find('.addButton').click({force:true})
        cy.get('.record-3').find('.source_data_map_source_data_system').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('store_credit');
        cy.get('.record-3').find('.source_data_map_source_data_export').find('input').as('sourceDataImport')
        cy.get('@sourceDataImport')
            .type('_map')
            .should('have.value', 'store_credit_map')
        cy.get('.record-3').find('.source_data_map_source_data_replace').find('input')
            .type('3')
            .should('have.value', '3')

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Export results
        cy.consoleExportResult('Entity customer_finance')
    })
})