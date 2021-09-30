context('Import Attributes Mapping Empty Rows 11', () => {
    it(' only update - csv - file - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click({force:true})

        //specify general section
        cy.generalImportSectionWithoutReIndex('Attributes Import - empty - rows')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click({force:true})
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('attribute',{force:true});

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append',{force:true});

        //specify Import Source section
        cy.get('[data-index="import_source"]').find('select').select('file',{force:true})
        cy.fileSource('pub/media/importexport/test/attributes_map.csv',{force:true})

        //validate Import file
        cy.get('.source_check_button').click({force:true})
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //map attributes
        cy.addMappingRowImport('.record-1','store_id','store_id_map')
        cy.addMappingRowImport('.record-2','attribute_set','attribute_set_map')
        cy.addMappingRowImport('.record-3','attribute_code','attribute_code_map')

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run',{timeout: 9000}).click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity attribute')
    })
})
