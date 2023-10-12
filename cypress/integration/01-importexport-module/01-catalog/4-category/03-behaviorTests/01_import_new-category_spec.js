
context('Import Categories New 1', () => {
    it(' import - new category - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Categories Import - new category')

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
        cy.fileSource('pub/media/importexport/test/category_detail_check.csv')
       
        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity catalog_category')

        //check that categories were created
        cy.get('#menu-magento-catalog-catalog').find('.item-catalog-categories').find('a').as('goToCategories')
        cy.get('@goToCategories').click({force:true})
        cy.get('#tree-div').contains('Category detail check ',{timeout: 60000}).click({force:true})

        //check attributes values of name , enable category , include in menu
        cy.wait(6000)
        cy.get('[name="name"]').should('have.value','Category detail check ')
        cy.get('[data-index="is_active"]').find('input').should('have.value','1')
        cy.get('[data-index="include_in_menu"]').find('input').should('have.value','1')

        //checking values in the Content Section
        cy.get('[data-index="content"]').find('.fieldset-wrapper-title').click({force:true});
        cy.get('[data-index="content"]').find('.file-uploader').find('.file-uploader-filename').contains('logo.png')
        cy.get('[name="landing_page"]').find('[data-title="Contact us info"]').should('be.selected')
        
        //checking values in the Display Setting Section
        cy.get('[data-index="display_settings"]').find('.fieldset-wrapper-title').click({force:true});
        cy.get('[name="display_mode"]').find('[value="PRODUCTS_AND_PAGE"]').should('be.selected')
        cy.get('[data-index="is_anchor"]').find('input').should('have.value','1')
        cy.get('[name="available_sort_by"]').find('[value="position"]').should('be.selected')
        cy.get('[name="available_sort_by"]').find('[value="name"]').should('be.selected')
        cy.get('[name="available_sort_by"]').find('[value="price"]').should('be.selected')
        cy.get('[name="default_sort_by"]').find('[value="position"]').should('be.selected')
        cy.get('[name="filter_price_range"]').should('have.value','10.000000')

        //checking values in the Search Engine Optimization Section
        cy.get('[data-index="search_engine_optimization"]').find('.fieldset-wrapper-title').click({force:true});
        cy.get('[data-index="url_key"]').find('[name="url_key"]').should('have.value','category-detail-check')
        cy.get('[data-index="meta_title"]').find('[name="meta_title"]').should('have.value','Meta title')
        cy.get('[data-index="meta_keywords"]').find('[name="meta_keywords"]').should('have.value','Meta, Keywords')
        cy.get('[data-index="meta_description"]').find('[name="meta_description"]').should('have.value','Meta Description')

        //checking values in the Design Section
        cy.get('[data-index="design"]').find('.fieldset-wrapper-title').click({force:true});
        cy.get('[data-index="custom_use_parent_settings"]').find('[name="custom_use_parent_settings"]').should('have.value','0')
        cy.get('[data-index="custom_design"]').find('[name="custom_design"]').should('have.value','3')
        cy.get('[data-index="page_layout"]').find('[name="page_layout"]').should('have.value','3columns')
        cy.get('[data-index="custom_apply_to_products"]').find('[name="custom_apply_to_products"]').should('have.value','1')
   
    })
})
