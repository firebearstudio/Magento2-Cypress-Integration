context('Import Url Rewrites', () => {
    it('add update - csv - sftp - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSection('Url Rewrites Import - export file - add update - csv - sftp')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('url_rewrite');

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append');

        //specify Import Source section
        cy.specifySftpSource('importSftp','/chroot/home/a0563af8/develop-gold.dev.firebearstudio.com/pub/media/importexport/test/export_url_rewrite.csv')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResult('Entity url_rewrite')

        //check that  url rewrites were added
        cy.get('#menu-magento-backend-marketing').find('.item-urlrewrite').find('a').as('goToUrlRewriteGrid')
        cy.get('@goToUrlRewriteGrid').click({force:true})
        cy.get('body').contains('gear/bags/a-bag11.html',{timeout: 60000})
        cy.get('body').contains('/argus-all-weather-tank1.html',{timeout: 60000})
        cy.get('body').contains('about-us1',{timeout: 60000})
        cy.get('body').contains('women/tops-women/jackets-womenn.html',{timeout: 60000})
        
    })
})
