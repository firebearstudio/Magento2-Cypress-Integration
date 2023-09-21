
context('Import Categories Per Store View 23', () => {
    it(' import - per store view - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Categories Import - Per Store Views')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('catalog_category',{force:true});

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append',{force:true});

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/categories_per_store_view.csv')
       
        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity catalog_category')

        //check that categories values are specific on different store views
        cy.get('#menu-magento-catalog-catalog').find('.item-catalog-categories').find('a').as('goToCategories')
        cy.get('@goToCategories').click({force:true})
        cy.get('#tree-div').contains('Category per store view',{timeout: 60000}).click({force:true})
        //check attributes values of name , enable category , include in menu on all store views
        cy.get('[name="name"]').should('have.value','Category per store view')
        cy.get('[data-index="is_active"]').find('input').should('have.value','1')
        cy.get('[data-index="include_in_menu"]').find('input').should('have.value','1')

        //check an attribute's value of is anchor
        cy.get('[data-index="display_settings"]').find('.fieldset-wrapper-title').click({force:true});
        cy.get('[data-index="is_anchor"]').find('input').should('have.value','0')

        //check attributes value of url_key , meta title , meta keywords , meta description
        cy.get('[data-index="search_engine_optimization"]').find('.fieldset-wrapper-title').click({force:true});
        cy.get('[data-index="url_key"]').find('[name="url_key"]').should('have.value','category-per-store-view')
        cy.get('[data-index="meta_title"]').find('[name="meta_title"]').should('have.value','Meta title')
        cy.get('[data-index="meta_keywords"]').find('[name="meta_keywords"]').should('have.value','Meta, Keywords')
        cy.get('[data-index="meta_description"]').find('[name="meta_description"]').should('have.value','Meta Description')

        //check attributes values of name , enable category , include in menu on default store view
        cy.get('#store-change-button').click({force:true})
        cy.get('.dropdown-menu').find('a').contains('Default Store View').click({force:true})
        cy.get('.modal-footer > .action-primary').click()

        cy.get('[name="name"]').should('have.value','Category per store view')
        cy.get('[data-index="is_active"]').find('input').should('have.value','1')
        cy.get('[data-index="include_in_menu"]').find('input').should('have.value','1')

        //check an attribute's value of is anchor
        cy.get('[data-index="display_settings"]').find('.fieldset-wrapper-title').click({force:true});
        cy.get('[data-index="is_anchor"]').find('input').should('have.value','0')

        //check attributes value of url_key , meta title , meta keywords , meta description
        cy.get('[data-index="search_engine_optimization"]').find('.fieldset-wrapper-title').click({force:true});
        cy.get('[data-index="url_key"]').find('[name="url_key"]').should('have.value','category-per-store-view')
        cy.get('[data-index="meta_title"]').find('[name="meta_title"]').should('have.value','Meta title')
        cy.get('[data-index="meta_keywords"]').find('[name="meta_keywords"]').should('have.value','Meta, Keywords')
        cy.get('[data-index="meta_description"]').find('[name="meta_description"]').should('have.value','Meta Description')

        //check attributes values of name , enable category , include in menu on French store view
        cy.get('#store-change-button').click({force:true})
        cy.get('.dropdown-menu').find('a').contains('French').click({force:true})
        cy.get('.modal-footer > .action-primary').click()
        
        cy.get('[name="name"]').should('have.value','Category per store view French')
        cy.get('[data-index="is_active"]').find('input').should('have.value','0')
        cy.get('[data-index="include_in_menu"]').find('input').should('have.value','0')

        //check an attribute's value of is anchor
        cy.get('[data-index="display_settings"]').find('.fieldset-wrapper-title').click({force:true});
        cy.get('[data-index="is_anchor"]').find('input').should('have.value','0')

        //check attributes value of url_key , meta title , meta keywords , meta description
        cy.get('[data-index="search_engine_optimization"]').find('.fieldset-wrapper-title').click({force:true});
        cy.get('[data-index="url_key"]').find('[name="url_key"]').should('have.value','category-per-store-view-french')
        cy.get('[data-index="meta_title"]').find('[name="meta_title"]').should('have.value','Meta title french')
        cy.get('[data-index="meta_keywords"]').find('[name="meta_keywords"]').should('have.value','Meta, Keywords french')
        cy.get('[data-index="meta_description"]').find('[name="meta_description"]').should('have.value','Meta Description french')

        //check attributes values of name , enable category , include in menu on German store view
        cy.get('#store-change-button').click({force:true})
        cy.get('.dropdown-menu').find('a').contains('German').click({force:true})
        cy.get('.modal-footer > .action-primary').click()
         
        cy.get('[name="name"]').should('have.value','Category per store view German')
        cy.get('[data-index="is_active"]').find('input').should('have.value','0')
        cy.get('[data-index="include_in_menu"]').find('input').should('have.value','0')
 
        //check an attribute's value of is anchor
        cy.get('[data-index="display_settings"]').find('.fieldset-wrapper-title').click({force:true});
        cy.get('[data-index="is_anchor"]').find('input').should('have.value','0')
 
        //check attributes value of url_key , meta title , meta keywords , meta description
        cy.get('[data-index="search_engine_optimization"]').find('.fieldset-wrapper-title').click({force:true});
        cy.get('[data-index="url_key"]').find('[name="url_key"]').should('have.value','category-per-store-view-german')
        cy.get('[data-index="meta_title"]').find('[name="meta_title"]').should('have.value','Meta title german')
        cy.get('[data-index="meta_keywords"]').find('[name="meta_keywords"]').should('have.value','Meta, Keywords german')
        cy.get('[data-index="meta_description"]').find('[name="meta_description"]').should('have.value','Meta Description german')
    })
})
