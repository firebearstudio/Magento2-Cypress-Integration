context('Import Cms Block', () => {
    it(' add - csv - map - file - new job', () => {
        //login
        cy.loginToAdminPanel('ce')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSection('Cms Block Import - add - csv - map - file')
        
        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('cms_block');

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append');

        //specify Import Source section
        cy.fileSource('pub/media/importexport//c/m/cms_block_map.csv')
        
        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //map attributes
        cy.get('.source_data_map_container_replace_default_value').find('select').as('replaceDefaultValue')
        cy.get('@replaceDefaultValue').select('All rows')
        cy.get('tfoot').find('.addButton').as('tfoot')
        cy.get('@tfoot').click({force:true})
        cy.get('.source_data_map_source_data_system').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('title');
        cy.get('.source_data_map_source_data_import').find('select').as('sourceDataImport')
        cy.get('@sourceDataImport').select('title_new');
        cy.get('.source_data_map_source_data_replace').find('input')
            .type('Title New')
            .should('have.value', 'Title New')

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResult('Entity cms_block')

        //check that mappinf changed cms page's title
        cy.get('#menu-magento-backend-content').find('.item-cms-block').find('a').as('goToCmsBlockGrid')
        cy.get('@goToCmsBlockGrid').click({force:true})
        cy.get('._odd-row').find('.data-grid-cell-content').contains('Title New')
    })
})