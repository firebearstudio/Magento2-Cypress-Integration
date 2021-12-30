
context('Import Reviews', () => {
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
        cy.generalImportSectionWithoutReIndex('Reviews Import - find and replace - csv - file')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('review',{force:true});

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append',{force:true});

        //specify Import Source section
        cy.googlePathSource('https://docs.google.com/spreadsheets/d/13FemIzzexF5koAdQYjbcKscqoCfXyknYWkQkbSZGPsk/edit#gid=884145049')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //specify find and replace
        cy.get('[data-index="source_data_replacing_container"]').click({force:true})

        //First row
        cy.get('[data-index="source_data_replacing_container"]').find('[data-action="add_new_row"]').as('addNewRow')
        cy.get('@addNewRow').click()
        cy.get('[data-index="data_source_replacing_attribute"]').find('[name="[0]"]',{timeout: 60000}).select('sku (Product Sku)',{force:true});
        // Individual words - 0 , Full Value - 1 
        cy.get('[name="source_data_replacing[0][data_source_replacing_target]"]').select('0',{force:true});
        //Yes - 1 , No - 0
        cy.get('[name="source_data_replacing[0][data_source_replacing_is_case_sensitive]"]').select('1',{force:true});
        cy.get('[name="source_data_replacing[0][data_source_replacing_find]"]')
            .type('WT09',{force: true})
            .should('have.value', 'WT09')
        cy.get('[name="source_data_replacing[0][data_source_replacing_replace]"]')
            .type('WS12',{force: true})
            .should('have.value', 'WS12')
        
        //Second row
        cy.get('@addNewRow').click()
        cy.get('[name="[1]"]').select('nickname (Nickname)',{force:true});
        cy.get('[name="source_data_replacing[1][data_source_replacing_target]"]').select('0',{force:true});
        cy.get('[name="source_data_replacing[1][data_source_replacing_is_case_sensitive]"]').select('0',{force:true});
        cy.get('[name="source_data_replacing[1][data_source_replacing_find]"]')
            .type('John (nickname of the reviewer)',{force: true})
            .should('have.value', 'John (nickname of the reviewer)')
        cy.get('[name="source_data_replacing[1][data_source_replacing_replace]"]')
            .type('Justin',{force: true})
            .should('have.value', 'Justin')

        //Third row
        cy.get('@addNewRow').click()
        cy.get('[name="[2]"]').select('title (Title)',{force:true});
        cy.get('[name="source_data_replacing[2][data_source_replacing_target]"]').select('1',{force:true});
        cy.get('[name="source_data_replacing[2][data_source_replacing_is_case_sensitive]"]').select('1',{force:true});
        cy.get('[name="source_data_replacing[2][data_source_replacing_find]"]')
            .type('Great product',{force: true})
            .should('have.value', 'Great product')
        cy.get('[name="source_data_replacing[2][data_source_replacing_replace]"]')
            .type('Test review',{force: true})
            .should('have.value', 'Test review')
           
        //Fourth row
        cy.get('@addNewRow').click()
        cy.get('[name="[3]"]').select('detail (Detail)',{force:true});
        cy.get('[name="source_data_replacing[3][data_source_replacing_target]"]').select('1',{force:true});
        cy.get('[name="source_data_replacing[3][data_source_replacing_is_case_sensitive]"]').select('0',{force:true});
        cy.get('[name="source_data_replacing[3][data_source_replacing_find]"]')
            .type('This is a great product indeed!',{force: true})
            .should('have.value', 'This is a great product indeed!')
        cy.get('[name="source_data_replacing[3][data_source_replacing_replace]"]')
            .type('Test detail',{force: true})
            .should('have.value', 'Test detail')
    
        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity review')

        //сheck that values were replaced
        cy.get('#menu-magento-backend-marketing').find('.item-catalog-reviews-ratings-reviews-all').find('a').as('goToReviewGrid')
        cy.get('@goToReviewGrid').click({force:true})
        cy.get('[data-column="sku"]').find('#reviewGrid_filter_sku')
           .type('WS12',{force: true})
           .should('have.value', 'WS12')
           .type('{enter}')
        cy.get('table').contains('Test review',{timeout: 60000})
        cy.get('table').contains('Test review').click()
        cy.get('.field-nickname',{timeout: 60000}).find('input').should('have.value','Justin')
        cy.get('.field-title',{timeout: 60000}).find('input').should('have.value','Test review')
        cy.get('.field-detail',{timeout: 60000}).find('textarea').should('have.value','Test detail')
    })
})
