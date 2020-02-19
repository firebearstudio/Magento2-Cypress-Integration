context('Import Page Hierarchy', () => {
    it(' add - xml - file - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSection('Page Hierarchy Import - add - xml - file')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('content_hierarchy');

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append');

        //specify Import Source section
        cy.get('.type_file').find('select').as('importSourceType')
        cy.get('@importSourceType').select('xml');
        cy.fileSource('pub/media/importexport/test/page_hierarchy_map.xml')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //map attributes
        cy.get('.source_data_map_container_replace_default_value').find('select').as('replaceDefaultValue')
        cy.get('@replaceDefaultValue').select('All rows')
        cy.get('tfoot').find('.addButton').as('tfoot')
        cy.get('@tfoot').click({force:true})
        cy.get('.record-1').find('.source_data_map_source_data_system').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('scope');
        cy.get('.record-1').find('.source_data_map_source_data_import').find('select').as('sourceDataImport')
        cy.get('@sourceDataImport').select('scope_map');

        cy.get('tfoot').find('.addButton').as('tfoot')
        cy.get('@tfoot').click({force:true})
        cy.get('.record-2').find('.source_data_map_source_data_system').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('scope_id');
        cy.get('.record-2').find('.source_data_map_source_data_import').find('select').as('sourceDataImport')
        cy.get('@sourceDataImport').select('scope_id_map');
        cy.get('.record-2').find('.source_data_map_source_data_replace').find('input')

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
         cy.consoleImportResult('Entity content_hierarchy')

         //check that page hierarchy were added
        cy.get('#menu-magento-backend-content').find('.item-versionscms-page-hierarchy').find('a').as('goToPageHierarchyGrid')
        cy.get('@goToPageHierarchyGrid').click({force:true})
        cy.get('.cms-hierarchy-tree').find('#ext-gen21').contains('First node',{timeout: 60000})
        cy.get('.cms-hierarchy-tree').find('#ext-gen27').click()
        cy.get('.x-tree-node-ct').find('#extdd-6').contains('Second node',{timeout: 60000})
        cy.get('.x-tree-node-ct').find('#extdd-8').contains('Sample CMS page 2',{timeout: 60000})
        cy.get('.x-tree-node-ct').find('#extdd-10').contains('Sample CMS page 1',{timeout: 60000})
        cy.get('.x-tree-node-ct').find('#extdd-12').contains('Title New',{timeout: 60000})
        cy.get('.x-tree-node-ct').find('#extdd-14').contains('Sample CMS page 3',{timeout: 60000})
        cy.get('.x-tree-node-ct').find('#extdd-16').contains('Third node',{timeout: 60000})
    })
})