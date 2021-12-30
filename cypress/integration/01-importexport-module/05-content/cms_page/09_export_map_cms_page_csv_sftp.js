context('Export Cms Page Mapping 9', () => {
    it('csv - sftp - new job', () => {
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
            .type('Cms Page Export - csv - sftp')
            .should('have.value', 'Cms Page Export - csv - sftp')

        //specify Export Settings section
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('cms_page',{force:true})

        //specify Export Behavior section
        cy.get('.behavior_behavior_field_file_format').find('select').as('fileFormat')
        cy.get('@fileFormat').select('csv',{force:true});

        //specify Import Source section
        cy.specifySftpSource('exportSftp' , '/chroot/home/a0563af8/develop-gold.dev.firebearstudio.com/pub/media/importexport/test/export_cms_page_map.csv')

        //check sftp connection
        cy.get('.source_check_button').click({force:true})
        cy.get('.fieldset_source').contains('Success! Your connection is ready!',{timeout: 60000})

        //mapping
        cy.get('.source_data_map_rows').find('tfoot').as('tfoot')
        cy.get('@tfoot').find('.addButton').click({force:true})
        cy.get('.source_data_map_source_data_system').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('page_id');
        cy.get('.source_data_map_source_data_export').find('input').as('sourceDataImport')
        cy.get('@sourceDataImport')
            .type('_map')
            .should('have.value', 'page_id_map');

        cy.get('.source_data_map_rows').find('tfoot').as('tfoot')
        cy.get('@tfoot').find('.addButton').click({force:true})
        cy.get('.record-2').find('.source_data_map_source_data_system').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('content');
        cy.get('.record-2').find('.source_data_map_source_data_export').find('input').as('sourceDataImport')
        cy.get('@sourceDataImport')
            .type('_map')
            .should('have.value', 'content_map');

        cy.get('.source_data_map_rows').find('tfoot').as('tfoot')
        cy.get('@tfoot').find('.addButton').click({force:true})
        cy.get('.record-3').find('.source_data_map_source_data_system').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('title');
        cy.get('.record-3').find('.source_data_map_source_data_export').find('input').as('sourceDataImport')
        cy.get('@sourceDataImport')
            .type('_map')
            .should('have.value', 'title_map')
        cy.get('.record-3').find('.source_data_map_source_data_replace').find('input')
            .type('Title Map')
            .should('have.value', 'Title Map')

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Export results
        cy.consoleExportResult('Entity cms_page')
    })
})