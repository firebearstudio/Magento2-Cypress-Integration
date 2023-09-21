
context('Import Categories Only Fields From Mapping 19', () => {
    it(' only mapping fields - csv - file - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Categories Import - Only fields from mapping')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('catalog_category',{force:true});

        //enable Use Only Fields From Mapping
        cy.get('[data-index="use_only_fields_from_mapping"]').find('.admin__actions-switch-label').as('useOnlyMappingFieldsEnabled')
        cy.get('@useOnlyMappingFieldsEnabled').click()

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append',{force:true});

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/categories_for_mapping_update.csv')
       
        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //map attributes
        cy.addMappingRowImport('.record-1','name','name')
        cy.addMappingRowImport('.record-2','store_view','store_view')
        cy.addMappingRowImport('.record-3','store_name','store_name')
        cy.addMappingRowImport('.record-4','url_key','url_key')

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity catalog_category')

        //check that categories were created
        cy.get('#menu-magento-catalog-catalog').find('.item-catalog-categories').find('a').as('goToCategories')
        cy.get('@goToCategories').click({force:true})
        cy.get('#tree-div').contains('Only Map Check',{timeout: 60000}).click({force:true})

        //checking that values are default in the Display Setting Section
        cy.get('[data-index="display_settings"]').find('.fieldset-wrapper-title').click({force:true});
        cy.get('[name="use_config[available_sort_by]"]').should('have.value','true')
        cy.get('[name="use_config[default_sort_by]"]').should('have.value','true')
        cy.get('[name="use_config[filter_price_range]"]').should('have.value','true')

        //checking that values are empty in the Search Engine Optimization Section
        cy.get('[data-index="search_engine_optimization"]').find('.fieldset-wrapper-title').click({force:true});
        cy.get('[data-index="meta_title"]').find('[name="meta_title"]').should('be.empty')
        cy.get('[data-index="meta_keywords"]').find('[name="meta_keywords"]').should('be.empty')
        cy.get('[data-index="meta_description"]').find('[name="meta_description"]').should('be.empty')

        //checking that values are default in the Design Section
        cy.get('[data-index="design"]').find('.fieldset-wrapper-title').click({force:true});
        cy.get('[data-index="custom_use_parent_settings"]').find('[name="custom_use_parent_settings"]').should('have.value','0')
        cy.get('[data-index="custom_design"]').find('[name="custom_design"]').should('have.value','')
        cy.get('[data-index="page_layout"]').find('[name="page_layout"]').should('have.value','')
        cy.get('[data-index="custom_apply_to_products"]').find('[name="custom_apply_to_products"]').should('have.value','0')
   
    })
})
