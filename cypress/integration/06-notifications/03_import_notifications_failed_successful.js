context('Import Advanced Pricing', () => {
    it('add update - xlsx - ftp - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSection('Advanced Pricing Import - notifications - xlsx - ftp')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('advanced_pricing',{force:true});

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append',{force:true});

        //specify Import Source section
        cy.get('.type_file').find('select').as('importSourceType')
        cy.get('@importSourceType').select('xlsx',{force:true})
        cy.specifySftpSource('importSftp' , '/chroot/home/a0563af8/develop-gold.dev.firebearstudio.com/pub/media/importexport/test/advanced_pricing.xlsx')

        //validate Import file
        cy.get('.source_check_button').click({force:true})
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //email notifications
        cy.get('[data-index="email_notification"]').find('.fieldset-wrapper-title').click({force:true})
        cy.get('[data-index="email_notification"]').find('[data-index="email_type"]').find('select').as('notificationType')
        cy.get('@notificationType').select('Failed and Successful Jobs',{force:true})
        cy.get('[data-index="email_notification"]').find('[data-index="receiver"]').find('select').as('notificationRecevier')
        cy.get('@notificationRecevier').select('marystoikaaa@gmail.com',{force:true})
        cy.get('[data-index="email_notification"]').find('[data-index="sender"]').find('select').as('notificationSender')
        cy.get('@notificationSender').select('custom1',{force:true})
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

        //check Import results
        cy.consoleImportResult('Entity advanced_pricing')
    })
})
