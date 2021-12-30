context('Import Url Rewrites', () => {
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
        cy.generalImportSection('Url Rewrites Import - add update - xml - file')

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
        cy.get('.type_file').find('select').as('importSourceType')
        cy.get('@importSourceType').select('xml');
        cy.fileSource('pub/media/importexport/url_rewrites_map.xml')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //map attributes
        cy.get('.source_data_map_container_replace_default_value').find('select').as('replaceDefaultValue')
        cy.get('@replaceDefaultValue').select('All rows')
        cy.addMappingRowImport('.record-1','description','description_map')
        cy.get('.source_data_map_source_data_replace').find('input')
            .type('Description Map')
            .should('have.value', 'Description Map')

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResult('Entity url_rewrite')

        //check that  description's value was changed
        cy.get('#menu-magento-backend-marketing').find('.item-urlrewrite').find('a').as('goToUrlRewriteGrid')
        cy.get('@goToUrlRewriteGrid').click({force:true})
        cy.get('.col-url_rewrite_id').contains('9493').as('urlEdit')
        cy.get('@urlEdit').click()
        cy.get('#description').contains('Description Map')
    })
})