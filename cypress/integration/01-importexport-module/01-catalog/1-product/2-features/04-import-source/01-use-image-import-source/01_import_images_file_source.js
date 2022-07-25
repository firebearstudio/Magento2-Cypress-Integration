
context('Import Products Images File Source', () => {
    it('import products - images - file - use image import source', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Product Import - images - file - use image import source')

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
        cy.fileSource('pub/media/importexport/test/products_use__image_import_source.csv')
        cy.get('[data-index="google_import_images_file_dir"]').find('input').as('imagesFilePath')
        cy.get('@imagesFilePath').invoke('val','pub/media/importexport/test/').trigger('change',{force:true})

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity catalog_product')
        cy.get('#debug-run').contains('Wrong URL/path used for attribute image in rows in rows').should('not.exist')
        cy.get('#debug-run').contains('Wrong URL/path used for attribute small_image in rows in rows').should('not.exist')
        cy.get('#debug-run').contains('Wrong URL/path used for attribute thumbnail in rows in rows').should('not.exist')
        cy.get('#debug-run').contains('Wrong URL/path used for attribute swatch_image in rows in rows').should('not.exist')
        cy.get('#debug-run').contains('Wrong URL/path used for attribute _media_image in rows in rows').should('not.exist')
    })
})
