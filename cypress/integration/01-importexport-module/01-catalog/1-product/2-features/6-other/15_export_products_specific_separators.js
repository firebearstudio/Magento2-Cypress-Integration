
context('Export Products Specific Separators 15',() => {
    it('export - specific separators - new job', () => {
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
            .type('Product Export - specific separators')
            .should('have.value', 'Product Export - specific separators')

        //specify Export Settings section
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('catalog_product',{force:true})

        //enable only admin values
        cy.get('[data-index="only_admin"]').find('.admin__actions-switch-label').click()

        //specify Export Behavior section
        cy.get('.behavior_behavior_field_file_format').find('select').as('fileFormat')
        cy.get('@fileFormat').select('csv',{force:true});

        //change separators
        cy.get('[data-index="behavior_field_separator"]').find('input').clear()
        cy.get('[data-index="behavior_field_separator"]').find('input').type(';')
        .should('have.value', ';')
        cy.get('[data-index="behavior_field_multiple_value_separator"]').clear()
        cy.get('[data-index="behavior_field_multiple_value_separator"]').find('input').type('.')
        .should('have.value', '.')

        //specify Import Source section
        cy.specifySftpSource('exportSftp' , '/chroot/home/a0563af8/develop-gold.dev.firebearstudio.com/pub/media/importexport/test/var/export_products_specific_separators.csv')
    
        //check sftp connection
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('Success! Your connection is ready!',{timeout: 20000})

        //filter
        cy.get('.source_filter_map_rows').find('tfoot').as('tfoot')
        cy.get('@tfoot').find('.addButton').click({force:true})
        cy.get('.record-1').find('[name="source_filter_field[value][0]"]').select('SKU')
        cy.get('.record-1').find('.source_filter_map_source_filter_filter').find('[name="source_filter_map[text][source_filter_filter]"]').clear()
        cy.get('.record-1').find('.source_filter_map_source_filter_filter').find('[name="source_filter_map[text][source_filter_filter]"]')
            .type('tst')
            .should('have.value', 'tst')

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').eq(0).click()

        //check Export results
        cy.consoleExportResult('Entity products')
    })
})
