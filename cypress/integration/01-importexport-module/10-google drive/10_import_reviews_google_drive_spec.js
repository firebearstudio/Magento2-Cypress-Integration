
context('Import Review Google Drive 10', () => {
    it('import review - google drive - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Review Import - add update - csv - google drive')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('review');

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append');
        
        //specify Import Source section
        cy.get('[data-index="import_source"]').find('select').select('googledrive')
        cy.get('[data-index="googledrive_googledrive_file_path"]').find('input')
            .type('new/reviews.csv',{force:true})
            .should('have.value','new/reviews.csv')

        //upload a key for the Google Drive
        const filepath = 'files/new1-268508-0814a8f755d1.json'
        cy.get('.googledrive_signing_key_file').find('input[type="file"]').attachFile(filepath)
        cy.get('.file-uploader-filename',{timeout: 10000}).contains('new1-268508-0814a8f755d1.json')

        //validate Import file
        cy.get('.source_check_button').click({force:true})
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 20000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity review')
    })
})

