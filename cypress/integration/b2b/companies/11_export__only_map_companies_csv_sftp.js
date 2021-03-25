context('Export Companies', () => {
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
            .type('Companies Export - Only map - csv - sftp')
            .should('have.value', 'Companies Export - Only map - csv - sftp')

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
        cy.specifySftpSource('exportSftp','/var/www/alex/files/test/export_company.csv')

        //check ftp connection
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('Success! Your connection is ready!',{timeout: 60000})

        //mapping
        cy.get('.source_data_map_container_source_data_count').find('.admin__actions-switch').click()
        cy.get('.source_data_map_rows').find('tfoot').as('tfoot')
        cy.get('@tfoot').find('.addButton').click({force:true})
        cy.get('.record-1').find('.source_data_map_source_data_system').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('company_name');
        cy.get('.record-1').find('.source_data_map_source_data_export').find('input').as('sourceDataImport')
        cy.get('@sourceDataImport')
            .type('_map')
            .should('have.value', 'company_name_map');

        cy.get('.source_data_map_rows').find('tfoot').as('tfoot')
        cy.get('@tfoot').find('.addButton').click({force:true})
        cy.get('.record-2').find('.source_data_map_source_data_entity').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('Customer');
        cy.get('.record-2').find('.source_data_map_source_data_system').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('website_id');
        cy.get('.record-2').find('.source_data_map_source_data_export').find('input').as('sourceDataImport')
        cy.get('@sourceDataImport')
            .type('_map')
            .should('have.value', 'website_id_map');

        cy.get('.source_data_map_rows').find('tfoot').as('tfoot')
        cy.get('@tfoot').find('.addButton').click({force:true})
        cy.get('.record-3').find('.source_data_map_source_data_system').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('telephone');
        cy.get('.record-3').find('.source_data_map_source_data_export').find('input').as('sourceDataImport')
        cy.get('@sourceDataImport')
            .type('_map')
            .should('have.value', 'telephone_map')
        cy.get('.record-3').find('.source_data_map_source_data_replace').find('input')
            .type('1234')
            .should('have.value', '1234')

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Export results
        cy.consoleExportResult('Entity company')
    })
})