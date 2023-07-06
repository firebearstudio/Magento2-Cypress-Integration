
context('Import Products Images With Space 9', () => {
    it('import - products - images - with space', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Product Import - images - with space')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('catalog_product',{force:true});

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append',{force:true});

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/product-images-with-space.csv')
        cy.get('[data-index="file_import_images_file_dir"]').find('input').type('pub/media/importexport/test/')
       
        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity catalog_product')
        cy.get('#debug-run').contains('Wrong URL/path used for attribute _media_image').should('not.exist')
        cy.get('#debug-run').contains('Wrong URL/path used for attribute image').should('not.exist')
        cy.get('#debug-run').contains('Wrong URL/path used for attribute small_image').should('not.exist')
        cy.get('#debug-run').contains('Wrong URL/path used for attribute thumbnail').should('not.exist')
        cy.get('#debug-run').contains('Wrong URL/path used for attribute swatch_image').should('not.exist')
    })
})
