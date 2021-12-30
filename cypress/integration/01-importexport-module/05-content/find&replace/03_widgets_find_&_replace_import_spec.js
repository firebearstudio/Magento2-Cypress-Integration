
context('Import Widgets', () => {
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
        cy.generalImportSectionWithoutReIndex('Widgets Import - find and replace - csv - file')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('widget',{force:true});

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append',{force:true});

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/widgets_find&replace.csv')
        
        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //specify find and replace
        cy.get('[data-index="source_data_replacing_container"]').click({force:true})

        //First row
        cy.get('[data-index="source_data_replacing_container"]').find('[data-action="add_new_row"]').as('addNewRow')
        cy.get('@addNewRow').click()
        cy.get('[data-index="data_source_replacing_attribute"]').find('[name="[0]"]',{timeout: 60000}).select('instance_type (Instance Type)',{force:true});
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
        cy.get('[name="[1]"]').select('title (Title)',{force:true});
        cy.get('[name="source_data_replacing[1][data_source_replacing_target]"]').select('0',{force:true});
        cy.get('[name="source_data_replacing[1][data_source_replacing_is_case_sensitive]"]').select('0',{force:true});
        cy.get('[name="source_data_replacing[1][data_source_replacing_find]"]')
            .type('Contact',{force: true})
            .should('have.value', 'Contact')
        cy.get('[name="source_data_replacing[1][data_source_replacing_replace]"]')
            .type('Test',{force: true})
            .should('have.value', 'Test')

        //Third row
        cy.get('@addNewRow').click()
        cy.get('[name="[2]"]').select('sort_order (Sort Order)',{force:true});
        cy.get('[name="source_data_replacing[2][data_source_replacing_target]"]').select('1',{force:true});
        cy.get('[name="source_data_replacing[2][data_source_replacing_is_case_sensitive]"]').select('1',{force:true});
        cy.get('[name="source_data_replacing[2][data_source_replacing_find]"]')
            .type('0',{force: true})
            .should('have.value', '0')
        cy.get('[name="source_data_replacing[2][data_source_replacing_replace]"]')
            .type('2',{force: true})
            .should('have.value', '2')
    
        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity widget')

        //check that values were replaced
        cy.get('#menu-magento-backend-content').find('.item-cms-widget-instance').find('a').as('goToWidgetGrid')
        cy.get('@goToWidgetGrid').click({force:true})
        cy.get('table',{timeout: 60000}).contains('Test us info',{timeout: 60000})
        cy.get('table',{timeout: 60000}).contains('2',{timeout: 60000})   
    })
})
