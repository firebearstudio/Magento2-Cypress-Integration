context('Export Quotes Ods 14', () => {
    it('ods - sftp - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-export-job').find('a').as('goToExportPageLink')
        cy.get('@goToExportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.get('.general_is_active',{timeout: 60000}).find('.admin__actions-switch-label').as('generalIsActive')
        cy.get('@generalIsActive').click()
        cy.get('.general_title ').find('input')
            .type('Quotes Export - ods - sftp')
            .should('have.value', 'Quotes Export - ods - sftp')

        //specify Export Settings section
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('quote')

        //specify Export Behavior section
        cy.get('.behavior_behavior_field_file_format').find('select').as('fileFormat')
        cy.get('@fileFormat').select('ods');

        //select the Quotes Entities: Quote, Item, Negotiable Quote
        cy.get('[data-index="behavior_field_quote"]').find('.admin__field-control > :nth-child(1)').find('input').click()
        cy.get('[data-index="behavior_field_quote"]').find('.admin__field-control > :nth-child(2)').find('input').click()
        cy.get('[data-index="behavior_field_quote"]').find('.admin__field-control > :nth-child(3)').find('input').click()

        //specify Import Source section
        cy.specifySftpSource('exportSftp','/chroot/home/a0563af8/develop-alpha.dev.firebearstudio.com/pub/media/importexport/test/var/export_quote.ods')

        //check ftp connection
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('Success! Your connection is ready!',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Export results
        cy.consoleExportResult('Entity quote')
    })
})