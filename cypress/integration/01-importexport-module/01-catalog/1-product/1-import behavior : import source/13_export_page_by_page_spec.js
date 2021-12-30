
context('Export Products Page by Page 15',() => {
    it('export - page by page - new job', () => {
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
            .type('Product Export - page by page')
            .should('have.value', 'Product Export - page by page')

        //specify Export Settings section
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('catalog_product',{force:true})

        //enable only admin values
        cy.get('[data-index="only_admin"]').find('.admin__actions-switch-label').click()

        //specify Export Behavior section
        cy.get('.behavior_behavior_field_file_format').find('select').as('fileFormat')
        cy.get('@fileFormat').select('csv',{force:true});

        //enable 'Export page by page' feature
        cy.get('[data-index="behavior_field_export_by_page"]').find('.admin__actions-switch-label').click()
        cy.get('[data-index="behavior_field_page_size"]').find('input').type('3')
        .should('have.value', '3')

        //specify Import Source section
        cy.specifySftpSource('exportSftp' , '/chroot/home/a0563af8/develop-gold.dev.firebearstudio.com/pub/media/importexport/test/var/export_products_page_by_page.csv')
    
        //check ftp connection
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('Success! Your connection is ready!',{timeout: 20000})

        //filter
        cy.get('.source_filter_map_rows').find('tfoot').as('tfoot')
        cy.get('@tfoot').find('.addButton').click({force:true})
        cy.get('.record-1').find('[name="source_filter_field[value][0]"]',{timeout: 10000}).select('Type')
        cy.get('.record-1').find('[name="source_filter_map[select][source_filter_filter]"]',{timeout: 10000}).select('Simple Product')

        cy.get('.source_filter_map_rows').find('tfoot').as('tfoot')
        cy.get('@tfoot').find('.addButton').click({force:true})
        cy.get('.record-2').find('[name="source_filter_field[value][1]"]').select('SKU')
        cy.get('.record-2').find('.source_filter_map_source_filter_filter').find('[name="source_filter_map[text][source_filter_filter]"]').clear()
        cy.get('.record-2').find('.source_filter_map_source_filter_filter').find('[name="source_filter_map[text][source_filter_filter]"]')
            .type('tst')
            .should('have.value', 'tst')

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Export results
        cy.consoleExportResult('Entity products')
        cy.get('#debug-run').contains('Exported 3 items.',{timeout: 60000})
    })
})