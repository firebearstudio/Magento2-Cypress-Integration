
context('Import Newsletter Subscribers', () => {
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
        cy.generalImportSectionWithoutReIndex('Newsletter Subscribers Import - find and replace - csv - file')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('newsletter_subscriber',{force:true});

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append',{force:true});

        //specify Import Source section
        cy.googlePathSource('https://docs.google.com/spreadsheets/d/13FemIzzexF5koAdQYjbcKscqoCfXyknYWkQkbSZGPsk/edit#gid=1878700955')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //specify find and replace
        cy.get('[data-index="source_data_replacing_container"]').click({force:true})

        //First row
        cy.get('[data-index="source_data_replacing_container"]').find('[data-action="add_new_row"]').as('addNewRow')
        cy.get('@addNewRow').click()
        cy.get('[data-index="data_source_replacing_attribute"]').find('[name="[0]"]',{timeout: 60000}).select('subscriber_email (Subscriber Email)',{force:true});
        // Individual words - 0 , Full Value - 1 
        cy.get('[name="source_data_replacing[0][data_source_replacing_target]"]').select('0',{force:true});
        //Yes - 1 , No - 0
        cy.get('[name="source_data_replacing[0][data_source_replacing_is_case_sensitive]"]').select('1',{force:true});
        cy.get('[name="source_data_replacing[0][data_source_replacing_find]"]')
            .type('roni',{force: true})
            .should('have.value', 'roni')
        cy.get('[name="source_data_replacing[0][data_source_replacing_replace]"]')
            .type('mary',{force: true})
            .should('have.value', 'mary')
        
        //Second row
        cy.get('@addNewRow').click()
        cy.get('[name="[1]"]').select('firstname (Firstname)',{force:true});
        cy.get('[name="source_data_replacing[1][data_source_replacing_target]"]').select('0',{force:true});
        cy.get('[name="source_data_replacing[1][data_source_replacing_is_case_sensitive]"]').select('0',{force:true});
        cy.get('[name="source_data_replacing[1][data_source_replacing_find]"]')
            .type('Ronny',{force: true})
            .should('have.value', 'Ronny')
        cy.get('[name="source_data_replacing[1][data_source_replacing_replace]"]')
            .type('Maria',{force: true})
            .should('have.value', 'Maria')

        //Third row
        cy.get('@addNewRow').click()
        cy.get('[name="[2]"]').select('lastname (Lastname)',{force:true});
        cy.get('[name="source_data_replacing[2][data_source_replacing_target]"]').select('1',{force:true});
        cy.get('[name="source_data_replacing[2][data_source_replacing_is_case_sensitive]"]').select('1',{force:true});
        cy.get('[name="source_data_replacing[2][data_source_replacing_find]"]')
            .type('Costello',{force: true})
            .should('have.value', 'Costello')
        cy.get('[name="source_data_replacing[2][data_source_replacing_replace]"]')
            .type('Test',{force: true})
            .should('have.value', 'Test')
           
        //Fourth row
        cy.get('@addNewRow').click()
        cy.get('[name="[3]"]').select('subscriber_status (Subscriber Status)',{force:true});
        cy.get('[name="source_data_replacing[3][data_source_replacing_target]"]').select('1',{force:true});
        cy.get('[name="source_data_replacing[3][data_source_replacing_is_case_sensitive]"]').select('0',{force:true});
        cy.get('[name="source_data_replacing[3][data_source_replacing_find]"]')
            .type('1',{force: true})
            .should('have.value', '1')
        cy.get('[name="source_data_replacing[3][data_source_replacing_replace]"]')
            .type('4',{force: true})
            .should('have.value', '4')
    
        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity newsletter_subscriber')

        //сheck that values were replaced
        cy.get('#menu-magento-backend-marketing').find('.item-newsletter-subscriber').find('a').as('goToNewsletterSubscriberGrid')
        cy.get('@goToNewsletterSubscriberGrid').click({force:true})
        cy.get('table').contains('mary_cost@example.com')
        cy.get('table').contains('Test')
        cy.get('table').contains('Maria')
        cy.get('table').contains('Unconfirmed')
    })
})
