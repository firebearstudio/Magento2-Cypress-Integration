context('Import Сategories Add Update Xlsx Sftp 8', () => {
    it('add update - xlsx - sftp - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click({force:true})

        //specify general section
        cy.get('.general_is_active',{timeout: 60000}).find('.admin__actions-switch-label').as('generalIsActive')
        cy.get('@generalIsActive').click()
        cy.get('.general_title ').find('input')
           .type('Category Import - add update - xlsx - sftp')
           .should('have.value', 'Category Import - add update - xlsx - sftp')
    
        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click({force:true})
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('catalog_category',{force:true});
        cy.get('.general_generate_url').find('.admin__actions-switch-label').as('generateUrl')
        cy.get('@generateUrl').click({force:true})

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append',{force:true});

        //specify Import Source section
        cy.get('.type_file').find('select').as('importSourceType')
        cy.get('@importSourceType').select('xlsx',{force:true});
        cy.specifySftpSource('importSftp','/chroot/home/a0563af8/develop-gold.dev.firebearstudio.com/pub/media/importexport/test/categories.xlsx',{force:true})

        //validate Import file
        cy.get('.source_check_button').click({force:true})
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity catalog_category')

        //check that categories were created
        cy.get('#menu-magento-catalog-catalog').find('.item-catalog-categories').find('a').as('goToCategories')
        cy.get('@goToCategories').click({force:true})
        cy.get('#tree-div').contains('First test category',{timeout: 60000})
        cy.get('#tree-div').contains('Second test category',{timeout: 60000})
        cy.get('#tree-div').contains('Third test category',{timeout: 60000})
    })
})
