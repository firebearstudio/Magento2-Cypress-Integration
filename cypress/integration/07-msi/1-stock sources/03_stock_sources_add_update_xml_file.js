context('Import Stock Sources Mapping 3', () => {
    it(' add  - map - csv - file - new job', () => {
        //login
        cy.loginToAdminPanel('ee')
        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Stock Sources Import - add - map - csv - file')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('stock_sources');

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append');

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/msi_stock_sources_map.csv')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //map attributes
        cy.get('.source_data_map_container_replace_default_value').find('select').as('replaceDefaultValue')
        cy.get('@replaceDefaultValue').select('All rows')
        cy.get('tfoot').find('.addButton').as('tfoot')
        cy.get('@tfoot').click({force:true})
        cy.get('.record-1').find('.source_data_map_source_data_system').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('source_code');
        cy.get('.record-1').find('.source_data_map_source_data_import').find('select').as('sourceDataImport')
        cy.get('@sourceDataImport').select('source_code_map');

        cy.get('tfoot').find('.addButton').as('tfoot')
        cy.get('@tfoot').click({force:true})
        cy.get('.record-2').find('.source_data_map_source_data_system').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('name');
        cy.get('.record-2').find('.source_data_map_source_data_import').find('select').as('sourceDataImport')
        cy.get('@sourceDataImport').select('name_map');

        cy.get('tfoot').find('.addButton').as('tfoot')
        cy.get('@tfoot').click({force:true})
        cy.get('.record-3').find('.source_data_map_source_data_system').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('enabled');
        cy.get('.record-3').find('.source_data_map_source_data_import').find('select').as('sourceDataImport')
        cy.get('@sourceDataImport').select('enabled_map');

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity stock_sources')

        //go to stock sources page
        cy.get('#menu-magento-backend-stores').find('.item-source').find('a').click({force:true})
        cy.get('table',{timeout: 10000}).contains('Default',{timeout: 10000})
        cy.get('table').contains('MSI-new-warehouse')
        cy.get('table').contains('new-warehouse')
        cy.get('table').contains('old-warehouse')

        //checking Msi-new-warehouse General section
        cy.get('[data-repeat-index="1"]',{timeout: 10000}).find('.action-menu-item').click({force:true})
        cy.get('[data-index="name"]').find('input').should('have.value', 'MSI New Warehouse')
        cy.get('[data-index="source_code"]').find('input').should('have.value', 'MSI-new-warehouse')
        cy.get('[data-index="enabled"]').find('[value="0"]')
        cy.get('[data-index="description"]').find('textarea').should('have.value', 'This is a new warehouse')
        cy.get('[data-index="latitude"]').find('input').should('have.value', '99.999999')
        cy.get('[data-index="longitude"]').find('input').should('have.value', '123')

        //checking Msi-new-warehouse Contact info section
        cy.get('[data-index="contact_info"]').find('.admin__page-nav-item-messages').click({force:true})
        cy.get('[data-index="contact_name"]').find('input').should('have.value', 'MSIWarehouse contact name')
        cy.get('[data-index="email"]').find('input').should('have.value', 'MSI.warehouse@email.com')
        cy.get('[data-index="phone"]').find('input').should('have.value', '123123123')
        cy.get('[data-index="fax"]').find('input').should('have.value', '321-321-3213')

        //checking Msi-new-warehouse Address Data section 
        cy.get('[data-index="address"]').find('.admin__page-nav-item-messages').click({force:true})
        cy.get('[data-index="country_id"]').find('[data-title="United States"]').should('be.selected')
        cy.get('[data-index="region_id"]').find('[data-title="Alabama"]').should('be.selected')
        cy.get('[data-index="city"]').find('input').should('have.value', 'City')
        cy.get('[data-index="street"]').find('input').should('have.value', 'Street')
        cy.get('[data-index="postcode"]').find('input').should('have.value', '12345')
    })
})