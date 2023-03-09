context('Import Attributes Image Custom Role Add Update 5', () => {
    it(' image custom role - add update - file - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click({force:true})

        //specify general section
        cy.generalImportSectionWithoutReIndex('Attributes Import - image custom role - add update')

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
        cy.get('.type_file').find('select').as('importSourceType')
        cy.get('@importSourceType').select('csv',{force:true});
        cy.get('[data-index="import_source"]').find('select').select('file',{force:true})
        cy.fileSource('pub/media/importexport/test/attributes_custom_role.csv',{force:true})

        //validate Import file
        cy.get('.source_check_button').click({force:true})
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity attribute')
        cy.get('#debug-run').contains('Wrong URL/path used for attribute _media_image').should('not.exist')
        cy.get('#debug-run').contains('Wrong URL/path used for attribute image').should('not.exist')
        cy.get('#debug-run').contains('Wrong URL/path used for attribute small_image').should('not.exist')
        cy.get('#debug-run').contains('Wrong URL/path used for attribute thumbnail').should('not.exist')
        cy.get('#debug-run').contains('Wrong URL/path used for attribute swatch_image').should('not.exist')
    })
})
