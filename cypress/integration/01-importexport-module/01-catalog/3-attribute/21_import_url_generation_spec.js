
context('Import Сategories Url Generation 21', () => {
    it('add update - url generation - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click({force:true})

        //specify general section
        cy.get('.general_is_active',{timeout: 60000}).find('.admin__actions-switch-label').as('generalIsActive')
        cy.get('@generalIsActive').click({force:true})
        cy.get('.general_title ').find('input')
           .type('Category Import - url generation')
           .should('have.value', 'Category Import - url generation')
        cy.get('.general_reindex').find('.admin__actions-switch-label').as('generalReindex')
        cy.get('@generalReindex').click({force:true})
        
        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click({force:true})
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('catalog_category',{force:true});
        cy.get('[data-index="generate_url"]').find('.admin__actions-switch-label').as('generateUrl')
        cy.get('@generateUrl').click({force:true})

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append',{force:true});

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/categories_url_generation.csv',{force:true})

        //validate Import file
        cy.get('.source_check_button').click({force:true})
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResult('Entity catalog_category')

        //check that categories were created
        cy.get('#menu-magento-catalog-catalog').find('.item-catalog-categories').find('a').as('goToCategories')
        cy.get('@goToCategories').click({force:true})
        cy.get('#tree-div').contains('Generation Category first',{timeout: 60000}).click({force:true})
        //checking url key value
        cy.get('[data-index="search_engine_optimization"]',{timeout: 10000}).find('.fieldset-wrapper-title').click({force:true});
        cy.get('[data-index="url_key"]').find('[name="url_key"]').should('have.value','generation')
        cy.get('#tree-div').contains('Generation Category second',{timeout: 60000}).click({force:true})
        //checking generated url key value
        cy.get('[data-index="search_engine_optimization"]',{timeout: 10000}).find('.fieldset-wrapper-title').click({force:true});
        cy.get('[data-index="url_key"]').find('[name="url_key"]').should('have.value','generation1')
        cy.get('#tree-div').contains('Generation Category third',{timeout: 60000}).click({force:true})
         //checking generated url key value
        cy.get('[data-index="search_engine_optimization"]',{timeout: 10000}).find('.fieldset-wrapper-title').click({force:true});
        cy.get('[data-index="url_key"]').find('[name="url_key"]').should('have.value','generation2')
    })
})
