
context('Import Categories', () => {
    it(' find and replace - csv - file - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Categories Import - find and replace - csv - file')

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
        cy.googlePathSource('https://docs.google.com/spreadsheets/d/13FemIzzexF5koAdQYjbcKscqoCfXyknYWkQkbSZGPsk/edit#gid=577514786')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //specify find and replace
        cy.get('[data-index="source_data_replacing_container"]').click({force:true})

        //First row
        cy.get('[data-index="source_data_replacing_container"]').find('[data-action="add_new_row"]').as('addNewRow')
        cy.get('@addNewRow').click()
        cy.get('[data-index="data_source_replacing_attribute"]').find('[name="[0]"]',{timeout: 60000}).select('meta_description',{force:true});
        // Individual words - 0 , Full Value - 1 
        cy.get('[name="source_data_replacing[0][data_source_replacing_target]"]').select('0',{force:true});
        //Yes - 1 , No - 0
        cy.get('[name="source_data_replacing[0][data_source_replacing_is_case_sensitive]"]').select('0',{force:true});
        cy.get('[name="source_data_replacing[0][data_source_replacing_find]"]')
            .type('meta',{force: true})
            .should('have.value', 'meta')
        cy.get('[name="source_data_replacing[0][data_source_replacing_replace]"]')
            .type('Test',{force: true})
            .should('have.value', 'Test')
        
        //Second row
        cy.get('@addNewRow').click()
        cy.get('[name="[1]"]').select('meta_keywords',{force:true});
        cy.get('[name="source_data_replacing[1][data_source_replacing_target]"]').select('0',{force:true});
        cy.get('[name="source_data_replacing[1][data_source_replacing_is_case_sensitive]"]').select('1',{force:true});
        cy.get('[name="source_data_replacing[1][data_source_replacing_find]"]')
            .type('Meta',{force: true})
            .should('have.value', 'Meta')
        cy.get('[name="source_data_replacing[1][data_source_replacing_replace]"]')
            .type('Test',{force: true})
            .should('have.value', 'Test')

        //Third row
        cy.get('@addNewRow').click()
        cy.get('[name="[2]"]').select('meta_title',{force:true});
        cy.get('[name="source_data_replacing[2][data_source_replacing_target]"]').select('0',{force:true});
        cy.get('[name="source_data_replacing[2][data_source_replacing_is_case_sensitive]"]').select('1',{force:true});
        cy.get('[name="source_data_replacing[2][data_source_replacing_find]"]')
            .type('Meta',{force: true})
            .should('have.value', 'Meta')
        cy.get('[name="source_data_replacing[2][data_source_replacing_replace]"]')
            .type('Test',{force: true})
            .should('have.value', 'Test')
           
        //Fourth row
        cy.get('@addNewRow').click()
        cy.get('[name="[3]"]').select('name',{force:true});
        cy.get('[name="source_data_replacing[3][data_source_replacing_target]"]').select('1',{force:true});
        cy.get('[name="source_data_replacing[3][data_source_replacing_is_case_sensitive]"]').select('1',{force:true});
        cy.get('[name="source_data_replacing[3][data_source_replacing_find]"]')
            .type('First',{force: true})
            .should('have.value', 'First')
        cy.get('[name="source_data_replacing[3][data_source_replacing_replace]"]')
            .type('Default Category/New test category',{force: true})
            .should('have.value', 'Default Category/New test category')

        //Fifth row
        cy.get('@addNewRow').click()
        cy.get('[name="[4]"]').select('url_key',{force:true});
        cy.get('[name="source_data_replacing[4][data_source_replacing_target]"]').select('1',{force:true});
        cy.get('[name="source_data_replacing[4][data_source_replacing_is_case_sensitive]"]').select('0',{force:true});
        cy.get('[name="source_data_replacing[4][data_source_replacing_find]"]')
            .type('Test1',{force: true})
            .should('have.value', 'Test1')
        cy.get('[name="source_data_replacing[4][data_source_replacing_replace]"]')
            .type('new_url1',{force: true})
            .should('have.value', 'new_url1')
    
        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity categories')

        //check that values were replaced
        cy.get('#menu-magento-catalog-catalog').find('.item-catalog-categories').find('a').as('goToCategories')
        cy.get('@goToCategories').click({force:true})
        cy.get('#tree-div').contains('New test category',{timeout: 60000})
        cy.get('#tree-div').contains('New test category').click({force:true});
        cy.get('[data-index="search_engine_optimization"]',{timeout: 60000}).find('.admin__page-nav-item-messages').click({force:true})
        cy.get('[data-index="url_key"]').find('input').should('have.value', 'new-url1')
        cy.get('[data-index="meta_title"]').find('input').should('have.value', 'Test title')
        cy.get('[data-index="meta_keywords"]').find('textarea').should('have.value', 'Test, Keywords')
        cy.get('[data-index="meta_description"]').find('textarea').should('have.value', 'Test Description')
    })
})
