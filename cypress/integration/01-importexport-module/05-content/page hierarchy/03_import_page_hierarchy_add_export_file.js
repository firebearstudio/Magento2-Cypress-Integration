context('Import Page Hierarchy Add Export File 3', () => {
    it('add - csv - sftp - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click({force:true})

        //specify general section
        cy.generalImportSectionWithoutReIndex('Page Hierarchy Import - export file - add - csv - sftp')
        
        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click({force:true})
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('content_hierarchy',{force:true});

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append',{force:true});

        //specify Import Source section
        cy.specifySftpSource('importSftp','/chroot/home/a0563af8/develop-gold.dev.firebearstudio.com/pub/media/importexport/test/export_page_hierarchy.csv')

        //validate Import file
        cy.get('.source_check_button').click({force:true})
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity content_hierarchy')

         //check that page hierarchy were added
        cy.get('#menu-magento-backend-content').find('.item-versionscms-page-hierarchy').find('a').as('goToPageHierarchyGrid')
        cy.get('@goToPageHierarchyGrid').click({force:true})
        cy.get('.cms-hierarchy-tree').find('#ext-gen21').contains('First node',{timeout: 60000})
        cy.get('.cms-hierarchy-tree').find('#ext-gen27').click()
        cy.get('.x-tree-node-ct').find('#extdd-6').contains('Second node',{timeout: 60000})
        cy.get('.x-tree-node-ct').find('#extdd-8').contains('Sample CMS page 2',{timeout: 60000})
        cy.get('.x-tree-node-ct').find('#extdd-10').contains('Sample CMS page 1',{timeout: 60000})
        cy.get('.x-tree-node-ct').find('#extdd-14').contains('Sample CMS page 3',{timeout: 60000})
        cy.get('.x-tree-node-ct').find('#extdd-16').contains('Third node',{timeout: 60000})
    })
})
