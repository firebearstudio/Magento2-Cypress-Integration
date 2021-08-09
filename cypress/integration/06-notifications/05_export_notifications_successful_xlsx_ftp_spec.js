context('Export Advanced Pricing Notifications Successful 5', () => {
    it('xlsx - sftp - new job', () => {
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
            .type('Advanced Pricing Export - notifications - successful - xlsx - sftp')
            .should('have.value', 'Advanced Pricing Export - notifications - successful - xlsx - sftp')

        //specify Export Settings section
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('advanced_pricing',{force:true})

        //specify Export Behavior section
        cy.get('.behavior_behavior_field_file_format').find('select').as('fileFormat')
        cy.get('@fileFormat').select('xlsx',{force:true})

        //specify Import Source section
        cy.specifySftpSource('exportSftp' , '/chroot/home/a0563af8/develop-gold.dev.firebearstudio.com/pub/media/importexport/test/adv_price_successful_notifications.xlsx')

        //check sftp connection
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('Success! Your connection is ready!',{timeout: 60000})

        //email notifications
        cy.get('[data-index="email_notification"]').find('.fieldset-wrapper-title').click({force:true})
        cy.get('[data-index="email_notification"]').find('[data-index="email_type"]').find('select').as('notificationType')
        cy.get('@notificationType').select('Successful Jobs',{force:true})
        cy.get('[data-index="email_notification"]').find('[data-index="receiver"]').find('select').as('notificationRecevier')
        cy.get('@notificationRecevier').select('marystoikaaa@gmail.com',{force:true})
        cy.get('[data-index="email_notification"]').find('[data-index="sender"]').find('select').as('notificationSender')
        cy.get('@notificationSender').select('support',{force:true})
        cy.get('[data-index="email_notification"]').find('[data-index="copy"]').find('input').as('notificationCopy')
        cy.get('@notificationCopy')
            .type('marystoikaaaa@gmail.com',{force:true})
            .should('have.value', 'marystoikaaaa@gmail.com')
        cy.get('[data-index="email_notification"]').find('[data-index="copy_method"]').find('select').as('notificationCopyMethod')
        cy.get('@notificationCopyMethod').select('bcc',{force:true})
        cy.get('[data-index="email_notification"]').find('[data-index="is_attach"]').find('.admin__actions-switch-label').as('notificationAttachLog')
        cy.get('@notificationAttachLog').click({force:true})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Export results
        cy.consoleExportResult('Entity advanced_pricing')
    })
})
