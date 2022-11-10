
context('Import Xml Path To The Import Entity Structure 1',{ retries: 0 }, () => {
    it('xml - path - to - the - import - entity - structure', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Product Import - xml - Path to the import entity structure')

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
        cy.get('.type_file').find('select').as('importSourceType')
        cy.get('@importSourceType').select('xml',{force:true});
        cy.fileSource('pub/media/importexport/test/products_path_to_the_import_entity_structure.xml')
        //enable 'Set path to the entity structure in the file' feature and fill the path 
        cy.get('[data-index="predefined_structure"]').find('.admin__actions-switch-label').as('predefinedStructure')
        cy.get('@predefinedStructure').click({force:true})
        cy.get('[data-index="path_to_entity_structure"]').find('input').type('/ElementName_1/ElementName_2/Items')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()
 
        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity catalog_product')
    })
})
