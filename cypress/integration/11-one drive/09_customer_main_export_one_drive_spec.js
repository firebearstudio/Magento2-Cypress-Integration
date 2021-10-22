
context('Export Customer Main One Drive 9',() => {
    it('export - one drive - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-export-job').find('a').as('goToExportPageLink')
        cy.get('@goToExportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click({force:true})

        //specify general section
        cy.get('.general_is_active',{timeout: 60000}).find('.admin__actions-switch-label').as('generalIsActive')
        cy.get('@generalIsActive').click({force:true})
        cy.get('.general_title ').find('input')
            .type('Customer Main Export - one drive')
            .should('have.value', 'Customer Main Export - one drive')

        //specify Export Settings section
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('customer',{force:true})

        //specify Export Behavior section
        cy.get('.behavior_behavior_field_file_format').find('select').as('fileFormat')
        cy.get('@fileFormat').select('csv',{force:true});

        //specify Import Source section
        cy.get('.source_export_source_entity').find('[name="export_source_entity"]').select('onedrive')
        cy.get('[name="export_source_onedrive_file_path"]').type('/export/customer_main.csv',{force:true})
            .should('have.value', '/export/customer_main.csv')

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Export results
        cy.consoleExportResult('Entity customer_main')
    })
})
