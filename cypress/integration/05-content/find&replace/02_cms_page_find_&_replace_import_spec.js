
context('Import Cms Page', () => {
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
        cy.generalImportSectionWithoutReIndex('Cms Page Import - find and replace - csv - file')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('cms_page',{force:true});

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append',{force:true});

        //specify Import Source section
        cy.googlePathSource('https://docs.google.com/spreadsheets/d/13FemIzzexF5koAdQYjbcKscqoCfXyknYWkQkbSZGPsk/edit#gid=1011856548')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //specify find and replace
        cy.get('[data-index="source_data_replacing_container"]').click({force:true})

        //First row
        cy.get('[data-index="source_data_replacing_container"]').find('[data-action="add_new_row"]').as('addNewRow')
        cy.get('@addNewRow').click()
        cy.get('[data-index="data_source_replacing_attribute"]').find('[name="[0]"]',{timeout: 60000}).select('title (Page Title)',{force:true});
        // Individual words - 0 , Full Value - 1 
        cy.get('[name="source_data_replacing[0][data_source_replacing_target]"]').select('0',{force:true});
        //Yes - 1 , No - 0
        cy.get('[name="source_data_replacing[0][data_source_replacing_is_case_sensitive]"]').select('1',{force:true});
        cy.get('[name="source_data_replacing[0][data_source_replacing_find]"]')
            .type('Sample',{force: true})
            .should('have.value', 'Sample')
        cy.get('[name="source_data_replacing[0][data_source_replacing_replace]"]')
            .type('Test',{force: true})
            .should('have.value', 'Test')
        
        //Second row
        cy.get('@addNewRow').click()
        cy.get('[name="[1]"]').select('is_active (Enable Page)',{force:true});
        cy.get('[name="source_data_replacing[1][data_source_replacing_target]"]').select('0',{force:true});
        cy.get('[name="source_data_replacing[1][data_source_replacing_is_case_sensitive]"]').select('0',{force:true});
        cy.get('[name="source_data_replacing[1][data_source_replacing_find]"]')
            .type('1',{force: true})
            .should('have.value', '1')
        cy.get('[name="source_data_replacing[1][data_source_replacing_replace]"]')
            .type('0',{force: true})
            .should('have.value', '0')

        //Third row
        cy.get('@addNewRow').click()
        cy.get('[name="[2]"]').select('page_layout (Page Layout)',{force:true});
        cy.get('[name="source_data_replacing[2][data_source_replacing_target]"]').select('1',{force:true});
        cy.get('[name="source_data_replacing[2][data_source_replacing_is_case_sensitive]"]').select('1',{force:true});
        cy.get('[name="source_data_replacing[2][data_source_replacing_find]"]')
            .type('1column',{force: true})
            .should('have.value', '1column')
        cy.get('[name="source_data_replacing[2][data_source_replacing_replace]"]')
            .type('2columns-left',{force: true})
            .should('have.value', '2columns-left')
    
        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity cms_page')

        //check that values were replaced
        cy.get('#menu-magento-backend-content').find('.item-versionscms-page-page').find('a').as('goToCmsPageGrid')
        cy.get('@goToCmsPageGrid').click({force:true})
        cy.get('table',{timeout: 60000}).contains('Test CMS page 1',{timeout: 60000})
        cy.get('table',{timeout: 60000}).contains('Test CMS page 2',{timeout: 60000})
        cy.get('table',{timeout: 60000}).contains('Disabled',{timeout: 60000})
        cy.get('table',{timeout: 60000}).contains('2 columns with left bar',{timeout: 60000})
     
    })
})
