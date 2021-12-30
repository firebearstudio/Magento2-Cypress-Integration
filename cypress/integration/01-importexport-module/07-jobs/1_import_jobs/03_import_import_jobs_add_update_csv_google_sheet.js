context('Import Import Jobs Add Update Csv GoogleSheet 3', () => {
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
        cy.generalImportSection('Import Jobs Import - add update - csv - google sheet')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('import_jobs',{force:true});

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append',{force:true});

        //specify Import Source section
        cy.googlePathSource('https://docs.google.com/spreadsheets/d/19bmvLoe6bpWcEAk9QOFn8L_whA1mMGOJYqR21WgF5DU/edit#gid=431436156')
       
        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResult('Entity import_jobs')

        //go to import jobs page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})
        cy.get('.data-grid-draggable').find('[data-repeat-index="0"]',{timeout: 10000}).as('auototestImportJobRow')
        cy.get('@auototestImportJobRow').find('.data-grid-actions-cell').find('a').click()

        //cehcking general settings section
        cy.get('.general_is_active',{timeout: 10000}).find('[value="1"]')
        cy.get('.general_title').find('input').should('have.value', 'autotest import job')
        cy.get('.general_frequency').find('[data-title="Every 1st day of month at 3:00am"]').should('be.selected')
        cy.get('.general_reindex').find('[value="1"]')
        cy.get('[data-index="indexers"]').find('[data-title="Customer Grid"]').should('be.selected')
        cy.get('[data-index="indexers"]').find('[data-title="Product Categories"]').should('be.selected')
        cy.get('[data-index="indexers"]').find('[data-title="Product EAV"]').should('be.selected')
        
        //cehcking import settings section
        cy.get('.fieldset_settings').find('.admin__page-nav-item-messages').click({force:true})
        cy.get('.settings_clear_attribute_value',{timeout: 6000}).find('[value="1"]')
        cy.get('.settings_remove_product_association').find('[value="1"]')
        cy.get('.settings_remove_product_website').find('[value="1"]')
        cy.get('.settings_remove_product_categories').find('[value="1"]')
        cy.get('[data-index="remove_images"]').find('[value="1"]')
        cy.get('[data-index="remove_images_dir"]').find('[value="1"]')
        cy.get('[data-index="image_resize"]').find('[value="1"]')
        cy.get('[data-index="remove_related_product"]').find('[value="1"]')
        cy.get('[data-index="remove_crosssell_product"]').find('[value="1"]')
        cy.get('[data-index="remove_upsell_product"]').find('[value="1"]')
        cy.get('[data-index="increase_product_stock_by_qty"]').find('[value="1"]')
        cy.get('[data-index="disable_products"]').find('[value="1"]')
        cy.get('[data-index="cache_products"]').find('[value="1"]')
        cy.get('[data-index="enable_product_url_pattern"]').find('[value="1"]')
        cy.get('[data-index="product_url_pattern"]').find('input').should('have.value', 'buy_[product_name]_[product_sku]')
        cy.get('.general_generate_url').find('[value="1"]')

        //checking import source section
        cy.get('.file_file_path').find('input').should('have.value', 'pub/media/importexport//c/u/custom_logic_downloadable_products.csv')
        cy.get('.file_import_images_file_dir').find('input').should('have.value', 'var/import/images/')
        cy.get('.source_image_import_source').find('[value="1"]')
        cy.get('.source_remove_current_mappings').find('[value="1"]')
        cy.get('[data-index="deferred_images"]').find('[value="1"]')

        //checking mapp attributes section
        cy.get('.fieldset_source_data_map_container').find('.source_data_map_container_replace_default_value').find('[data-title="All rows"]').should('be.selected')
        cy.get('.source_data_map_rows').find('.record-1').as('mapAttributeFirstRow')
        cy.get('@mapAttributeFirstRow').find('.source_data_map_source_data_system').find('[value="sku"]').should('be.selected')
        cy.get('@mapAttributeFirstRow').find('.source_data_map_source_data_import').find('[data-title="sku"]').should('be.selected')
        cy.get('.source_data_map_rows').find('.record-2').as('mapAttributeSecondRow')
        cy.get('@mapAttributeSecondRow').find('.source_data_map_source_data_system').find('[value="price"]').should('be.selected')
        cy.get('@mapAttributeSecondRow').find('.source_data_map_source_data_import').find('[data-title="price"]').should('be.selected')
        cy.get('.source_data_map_rows').find('.record-3').as('mapAttributeThirdRow')
        cy.get('@mapAttributeThirdRow').find('.source_data_map_source_data_system').find('[value="description"]').should('be.selected')
        cy.get('@mapAttributeThirdRow').find('.source_data_map_source_data_import').find('[data-title="description"]').should('be.selected')
        cy.get('@mapAttributeThirdRow').find('.source_data_map_source_data_replace').find('input').should('have.value', 'new')

        //checking map attribute values section
        cy.get('.fieldset_source_data_map_container_attribute_values').find('tbody',{timeout: 3000}).as('mapAttrValueContainer')
        cy.get('@mapAttrValueContainer').find('[name="source_data_attribute_values_map[0][source_data_attribute_value_system]"]').should('have.value', '88')
        cy.get('@mapAttrValueContainer').find('[name="source_data_attribute_values_map[0][source_data_attribute_value_import]"]').should('have.value', '100')
        cy.get('@mapAttrValueContainer').find('[name="source_data_attribute_values_map[1][source_data_attribute_value_system]"]').should('have.value', 'New New New')
        cy.get('@mapAttrValueContainer').find('[name="source_data_attribute_values_map[1][source_data_attribute_value_import]"]').should('have.value', 'Test Configurable-simple product-S-Green')

        //checking map categories section
        cy.get('.fieldset_source_data_map_container_category').find('.admin__action-multiselect-text').contains('Women')
        cy.get('[data-index="source_category_data_import"]').find('.admin__field-control').contains('Default Category/Women/Tops/Hoodies & Sweatshirts')
        cy.get('[data-index="source_category_data_new"]').find('.admin__field-control').contains('Default Category/Women/Tops')

        //checking price rules section
        cy.get('.price_rules_container_20_round_up_prices').find('[value="1"]')
        cy.get('.price_rules_container_20_round_up_special_price').find('[value="1"]')
        cy.get('[data-index="price_rules_rows"]').find('[data-title="Percent"]').should('be.selected')
        cy.get('[data-index="price_rules_rows"]').find('input').should('have.value', '20')

        //checking custom logic section
        cy.get('.configurable_configurable_switch').find('[value="1"]')
        cy.get('.configurable_configurable_create').find('[value="1"]')
        cy.get('.configurable_configurable_type').find('[data-title="Сreate config product by same attribute of simple products"]').should('be.selected')
        cy.get('.configurable_configurable_field').find('[data-title="group"]').should('be.selected')
        cy.get('.configurable_variations_rows').find('.record-1').find('[data-title="color (Color)"]').should('be.selected')
        cy.get('.configurable_variations_rows').find('.record-2').find('[data-title="size (Size)"]').should('be.selected')
        cy.get('.copy_simple_value_rows').find('.record-1').find('[data-title="description (Description)"]').should('be.selected')

        //notification section
        cy.get('[data-index="email_notification"]').find('.admin__page-nav-item-messages').click({force:true})
        cy.get('[data-index="sender"]').find('[data-title="Custom Email 1"]').should('be.selected')
        cy.get('[data-index="copy"]').find('input').should('have.value', 'marystoikaaaa@gmail.com')
        cy.get('[data-index="is_attach"]').find('[value="1"]')
    })
})
