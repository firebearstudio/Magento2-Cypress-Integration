context('Import Export Jobs', () => {
    it('add update - csv - google sheet - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSection('Export Jobs Import - add update - csv - google sheet')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('export_jobs',{force:true});

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append',{force:true});

        //specify Import Source section
        cy.googlePathSource('https://docs.google.com/spreadsheets/d/18FhPuai5cShzlrpHOnET5P77CmwEnj2zISKajOH3wBc/edit#gid=405471091')
       
        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResult('Entity export_jobs')

        //go to Export Jobs page
        cy.get('.item-export-job').find('a').as('goToExportPageLink')
        cy.get('@goToExportPageLink').click({force:true})
        cy.get('.data-grid-draggable').find('[data-repeat-index="0"]',{timeout: 10000}).as('auototestExportJobRow')
        cy.get('@auototestExportJobRow').find('.data-grid-actions-cell').find('a').click()

        //cehcking general settings section
        cy.get('.general_is_active',{timeout: 10000}).find('[value="1"]')
        cy.get('.general_title').find('input').should('have.value', 'autotest export job')
        cy.get('.general_frequency').find('[data-title="Every 1st day of month at 3:00am"]').should('be.selected')
        cy.get('.general_event').find('[data-title="catalog_product_save_after"]').should('be.selected')
        cy.get('.general_event').find('[data-title="checkout_submit_all_after"]').should('be.selected')
        cy.get('.general_divided_additional',{timeout: 10000}).find('[value="1"]')
        
        //checking export settings
        cy.get('.settings_entity').find('[data-title="Products"]').should('be.selected')
        cy.get('.settings_enable_last_entity_id',{timeout: 10000}).find('[value="1"]')

        //checking store filter section
        cy.get('.behavior_stores_behavior_field_store_ids').find('[data-title="Main Website/Main Website Store/Default Store View"]').should('be.selected')
        
        //checking export behavior section
        cy.get('[data-index="behavior_field_export_by_page"]',{timeout: 10000}).find('[value="1"]')
        cy.get('[data-index="behavior_field_page_size"]').find('input').should('have.value', '50')
        cy.get('.source_export_source_entity').find('[data-title="File"]').should('be.selected')
        cy.get('.export_source_file_file_path').find('input').should('have.value', '/var/export/export_job.csv')

        //checking map attributes section
        cy.get('.source_data_map_container_source_data_count',{timeout: 10000}).find('[value="1"]')
        cy.get('.source_data_map_rows').find('.record-1').find('.source_data_map_source_data_system').find('[data-title="sku"]').should('be.selected')
        cy.get('.source_data_map_rows').find('.record-1').find('.source_data_map_source_data_export').find('input').should('have.value', 'sku_map')
        cy.get('.source_data_map_rows').find('.record-2').find('.source_data_map_source_data_system').find('[data-title="price"]').should('be.selected')
        cy.get('.source_data_map_rows').find('.record-2').find('.source_data_map_source_data_export').find('input').should('have.value', 'price_map')
        cy.get('.source_data_map_rows').find('.record-2').find('.source_data_map_source_data_replace').find('input').should('have.value', '300')
        cy.get('.source_data_map_rows').find('.record-3').find('.source_data_map_source_data_system').find('[data-title="url_key"]').should('be.selected')
        cy.get('.source_data_map_rows').find('.record-3').find('.source_data_map_source_data_export').find('input').should('have.value', 'url_key_map')
        cy.get('.source_data_map_rows').find('.record-4').find('.source_data_map_source_data_system').find('[data-title="weight"]').should('be.selected')
        cy.get('.source_data_map_rows').find('.record-4').find('.source_data_map_source_data_export').find('input').should('have.value', 'weight_map')
        cy.get('.source_data_map_rows').find('.record-4').find('.source_data_map_source_data_replace').find('input').should('have.value', '4')

        //checking filter section
        cy.get('.source_filter_map_rows').find('.record-1').find('.source_filter_map_source_filter_field').find('[data-title="SKU"]').should('be.selected')
        cy.get('.source_filter_map_rows').find('.record-1').find('.source_filter_map_source_filter_filter').find('input').should('have.value', 'tst')

        //checking notification section
        cy.get('[data-index="email_notification"]').find('.admin__page-nav-item-messages').click({force:true})
        cy.get('[data-index="sender"]').find('[data-title="Custom Email 1"]').should('be.selected')
        cy.get('[data-index="copy"]').find('input').should('have.value', 'marystoikaaaa@gmail.com')
        cy.get('[data-index="copy_method"]').find('[data-title="Separate Email"]').should('be.selected')
        cy.get('[data-index="is_attach"]',{timeout: 10000}).find('[value="1"]')
      
    })
})
