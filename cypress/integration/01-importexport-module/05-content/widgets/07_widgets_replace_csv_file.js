context('Import Widgets Replace Csv File 7', () => {
    it('widgets - replace - csv - file - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click({force:true})

        //specify general section
        cy.generalImportSectionWithoutReIndex('Widgets Import - replace - csv - file')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click({force:true})
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('widget',{force:true});

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('replace',{force:true});

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/widgets_replace.csv')

        //validate Import file
        cy.get('.source_check_button').click({force:true})
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity widget')

        //check that value of the widget title was replaced
        // cy.get('#menu-magento-backend-content').find('.item-cms-widget-instance').find('a').as('goToWidgetGrid')
        // cy.get('@goToWidgetGrid').click({force:true})
        // cy.get('#widgetInstanceGrid_table').find('.data-grid-filters').as('findFilter')
        // cy.get('@findFilter').find('.col-type').as('typeFilter')
        // cy.get('@typeFilter').find('select').as('selectType')
        // cy.get('@selectType').select('CMS Page Link')
        // cy.get('.admin__filter-actions').find('.action-secondary').as('filterValues')
        // cy.get('@filterValues').click()
        // cy.get('#widgetInstanceGrid_table').find('.col-type').contains('CMS Page Link',{timeout: 600000})
    })
})