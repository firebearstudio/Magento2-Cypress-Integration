context('Export Categories', () => {
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
            .type('Categories Export - xlsx - ftp')
            .should('have.value', 'Categories Export - xlsx - ftp')

        //specify Export Settings section
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('catalog_category')

        //specify Export Behavior section
        cy.get('.behavior_behavior_field_file_format').find('select').as('fileFormat')
        cy.get('@fileFormat').select('xlsx');

        //specify Import Source section
        cy.ftpSource('exportFtp','/files/import_category_add_update_sample_data.xlsx')
        
        //check ftp connection
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('Success! Your connection is ready!',{timeout: 60000})

        //filter
        cy.get('.source_filter_map_rows').find('tfoot').as('tfoot')
        cy.get('@tfoot').find('.addButton').click({force:true})
        cy.get('.record-1').find('.source_filter_map_source_filter_field').find('select').as('sourceDataImport')
        cy.get('@sourceDataImport').select('url_path')
        cy.get('.record-1').find('.source_filter_map_source_filter_filter').find('[name="source_filter_filter[text][0]"]')
            .type('test/')
            .should('have.value', 'test/')

        cy.get('.source_filter_map_rows').find('tfoot').as('tfoot')
        cy.get('@tfoot').find('.addButton').click({force:true})
        cy.get('.record-2').find('.source_filter_map_source_filter_field').find('select').as('sourceDataImport')
        cy.get('@sourceDataImport').select('Use Parent Category Settings')
        cy.get('.record-2').find('.source_filter_map_source_filter_filter').find('select').as('sourceDataImport')
        cy.get('@sourceDataImport').select('Yes')

        cy.get('.source_filter_map_rows').find('tfoot').as('tfoot')
        cy.get('@tfoot').find('.addButton').click({force:true})
        cy.get('.record-3').find('.source_filter_map_source_filter_field').find('select').as('sourceDataImport')
        cy.get('@sourceDataImport').select('Default Product Listing Sort By')
        cy.get('.record-3').find('.source_filter_map_source_filter_filter').find('select').as('sourceDataImport')
        cy.get('@sourceDataImport').select('Product Name')

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Export results
        cy.consoleExportResult('Entity catalog_category')
    })
})
