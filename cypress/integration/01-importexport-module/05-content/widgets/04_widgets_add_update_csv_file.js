context('Import Widgets Mapping 4', () => {
    it(' add update - csv - file - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click({force:true})

        //specify general section
        cy.generalImportSectionWithoutReIndex('Widgets - add update - csv - file')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click({force:true})
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('widget',{force:true});

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append',{force:true});

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/widgets_map.csv')

        //validate Import file
        cy.get('.source_check_button').click({force:true})
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //map attributes
        cy.get('.source_data_map_container_replace_default_value').find('select').as('replaceDefaultValue')
        cy.get('@replaceDefaultValue').select('All rows')
        cy.addMappingRowImport('.record-1','widget_id','widget_id_new')
        cy.addMappingRowImport('.record-2','type_code','type_code_new')
        cy.addMappingRowImport('.record-3','title','title_new')
        cy.get('.record-3').find('.source_data_map_source_data_replace').find('input')
            .type('Title Map')
            .should('have.value', 'Title Map')

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity widget')

        //check that widgets were added and that mapping changed widget titles
        cy.get('#menu-magento-backend-content').find('.item-cms-widget-instance').find('a').as('goToWidgetGrid')
        cy.get('@goToWidgetGrid').click({force:true})
        cy.get('#widgetInstanceGrid_table').find('.data-grid-filters').as('widgetGrid')
        cy.get('@widgetGrid').find('.col-title').as('searchColumnTitle')
        cy.get('@searchColumnTitle').find('input')
          .type('Title Map')
          .should('have.value','Title Map').as('inputValue')
        cy.get('@inputValue').type('{enter}')
        cy.get('#widgetInstanceGrid_table').find('tr').find('.col-title').contains('Title Map',{timeout: 60000})
    })
})