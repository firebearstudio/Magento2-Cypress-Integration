context('Import Shared Catalog', () => {
    it(' add update - xml - file - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSection('Shared Catalog Import - add update - xml - file')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('shared_catalog');

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('add_update');

        //specify Import Source section
        cy.get('.type_file').find('select').as('importSourceType')
        cy.get('@importSourceType').select('xml');
        cy.fileSource('pub/media/importexport/test/b2b_shared_catalog_map.xml')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //map attributes
        cy.get('.source_data_map_container_replace_default_value').find('select').as('replaceDefaultValue')
        cy.get('@replaceDefaultValue').select('All rows')
        cy.get('tfoot').find('.addButton').as('tfoot')
        cy.get('@tfoot').click({force:true})
        cy.get('.record-1').find('.source_data_map_source_data_system').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('name');
        cy.get('.record-1').find('.source_data_map_source_data_import').find('select').as('sourceDataImport')
        cy.get('@sourceDataImport').select('name_map');

        cy.get('tfoot').find('.addButton').as('tfoot')
        cy.get('@tfoot').click({force:true})
        cy.get('.record-2').find('.source_data_map_source_data_system').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('description');
        cy.get('.record-2').find('.source_data_map_source_data_import').find('select').as('sourceDataImport')
        cy.get('@sourceDataImport').select('description_map');

        cy.get('tfoot').find('.addButton').as('tfoot')
        cy.get('@tfoot').click({force:true})
        cy.get('.record-3').find('.source_data_map_source_data_system').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('type');
        cy.get('.record-3').find('.source_data_map_source_data_import').find('select').as('sourceDataImport')
        cy.get('@sourceDataImport').select('type_map');
        cy.get('.record-3').find('.source_data_map_source_data_replace').find('input')
            .type('1')
            .should('have.value', '1')

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResult('Entity shared_catalog')

        //check that type's value was changed
        cy.get('#menu-magento-catalog-catalog').find('.item-shared-list').find('a').as('goToSharedCatalogGrid')
        cy.get('@goToSharedCatalogGrid').click({force:true})
        cy.get('[data-bind="text: $col.getLabel($row())"]').contains('Custom').should('not.exist')
    })
})