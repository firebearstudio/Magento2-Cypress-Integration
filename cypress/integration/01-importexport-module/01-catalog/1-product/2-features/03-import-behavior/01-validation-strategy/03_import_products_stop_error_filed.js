
context('Import Products Stop on Error - Failed',{ retries: 0 }, () => {
    it('import products - stop on Error - Failed', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Product Import - stop on error - failed')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('catalog_product');

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append');
        cy.get('[data-index="validation_strategy"]').find('select').as('fieldValedationStrategy')
        cy.get('@fieldValedationStrategy').select('validation-stop-on-errors')
        cy.get('[data-index="allowed_error_count"]').find('input').as('allowedErrorCount')
        cy.get('@allowedErrorCount').invoke('val', '2').trigger('change',{force:true})

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/products_for_stop_erros.csv')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 20000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.get('#debug-run').contains('Please make sure attribute "sku" is not empty.',{timeout: 10000})
        cy.get('#debug-run').contains('Data validation is failed. Please fix errors and re-upload the file..',{timeout: 10000})
        cy.get('#debug-run').contains('was failure',{timeout: 10000})
    })
})
