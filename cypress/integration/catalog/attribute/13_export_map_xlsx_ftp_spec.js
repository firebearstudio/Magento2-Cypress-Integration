context('Export Attributes', () => {
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
            .type('Attributes Export - xlsx - ftp')
            .should('have.value', 'Attributes Export - xlsx - ftp')

        //specify Export Settings section
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('attribute')

        //specify Export Behavior section
        cy.get('.behavior_behavior_field_file_format').find('select').as('fileFormat')
        cy.get('@fileFormat').select('xlsx');

        //specify Import Source section
        cy.ftpSource('exportFtp','/files/import_attribute_add_update_sample_data.xlsx')

        //check ftp connection
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('Success! Your connection is ready!',{timeout: 60000})

         //mapping
         cy.get('.source_data_map_rows').find('tfoot').as('tfoot')
         cy.get('@tfoot').find('.addButton').click({force:true})
         cy.get('.record-1').find('.source_data_map_source_data_system').find('select').as('sourceDataSystem')
         cy.get('@sourceDataSystem').select('store_id');
         cy.get('.record-1').find('.source_data_map_source_data_export').find('input').as('sourceDataImport')
         cy.get('@sourceDataImport')
             .type('_map')
             .should('have.value', 'store_id_map');
 
         cy.get('.source_data_map_rows').find('tfoot').as('tfoot')
         cy.get('@tfoot').find('.addButton').click({force:true})
         cy.get('.record-2').find('.source_data_map_source_data_system').find('select').as('sourceDataSystem')
         cy.get('@sourceDataSystem').select('attribute_set');
         cy.get('.record-2').find('.source_data_map_source_data_export').find('input').as('sourceDataImport')
         cy.get('@sourceDataImport')
             .type('_map')
             .should('have.value', 'attribute_set_map');
 
         cy.get('.source_data_map_rows').find('tfoot').as('tfoot')
         cy.get('@tfoot').find('.addButton').click({force:true})
         cy.get('.record-3').find('.source_data_map_source_data_system').find('select').as('sourceDataSystem')
         cy.get('@sourceDataSystem').select('attribute_code');
         cy.get('.record-3').find('.source_data_map_source_data_export').find('input').as('sourceDataImport')
         cy.get('@sourceDataImport')
             .type('_map')
             .should('have.value', 'attribute_code_map')
         cy.get('.record-3').find('.source_data_map_source_data_replace').find('input')
             .type('99')
             .should('have.value', '99')

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Export results
        cy.consoleExportResult('Entity attribute')
    })
})
