
context('Import Products', () => {
    it('remove - current - mapping - csv - file - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSection('Product Import - remove - current - mapping - csv - file')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('catalog_product');

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append');

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/product_all_types.csv')

        //enable 'Do you want to remove current mappings?'
        cy.get('.source_remove_current_mappings').find('.admin__actions-switch-label').as('removeCurrentMapping')
        cy.get('@removeCurrentMapping').click()

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //map attributes
        cy.get('.source_data_map_container_replace_default_value').find('select').as('replaceDefaultValue')
        cy.get('@replaceDefaultValue').select('All rows')
        cy.get('.source_data_map_rows').find('.addButton').as('tfoot')
        cy.get('@tfoot').click({force:true})
        cy.get('.record-1').find('.source_data_map_source_data_system').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('sku');
        cy.get('.record-1').find('.source_data_map_source_data_import').find('select').as('sourceDataImport')
        cy.get('@sourceDataImport').select('sku');

        cy.get('.source_data_map_rows').find('.addButton').as('tfoot')
        cy.get('@tfoot').click({force:true})
        cy.get('.record-2').find('[data-index="source_data_system"]').find('select').as('sourceDataSystem')
        cy.get('@sourceDataSystem').select('product_type');
        cy.get('.record-2').find('.source_data_map_source_data_import').find('select').as('sourceDataImport')
        cy.get('@sourceDataImport').select('product_type');

        //map attribute values
        cy.get('.source_data_attribute_values_map_rows').find('.addButton').click({force:true})
        cy.get('.source_data_attribute_values_map_source_data_attribute_value_system').find('input').as('mapSystemValue')
        cy.get('@mapSystemValue').invoke('val', '888').trigger('change',{force:true})
        cy.get('.source_data_attribute_values_map_source_data_attribute_value_import').find('input').as('mapImportValue')
        cy.get('@mapImportValue').invoke('val', '100').trigger('change',{force:true})

        cy.get('#save_and_continue').click({force:true})

        //specify Import Source section
        cy.googlePathSource('https://docs.google.com/spreadsheets/d/13FemIzzexF5koAdQYjbcKscqoCfXyknYWkQkbSZGPsk/edit#gid=1164219475')

        //validate Import file
        cy.get('.source_check_button').click({force:true})
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //check that mapping was removed
        cy.get('.source_data_map_rows').find('tbody').should('not.have.class','.record-1')
        cy.get('.source_data_map_rows').find('tbody').should('not.have.class','.record-2')
        cy.get('.source_data_attribute_values_map_rows').find('tbody').should('not.have.class','.record-1')
        cy.get('.source_data_attribute_values_map_rows').find('tbody').should('not.have.class','.record-2')
    })
})
