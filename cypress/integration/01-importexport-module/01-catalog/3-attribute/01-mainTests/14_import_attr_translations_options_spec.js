context('Import Attributes Translations Options 14', () => {
    it(' import translations options - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click({force:true})

        //specify general section
        cy.generalImportSectionWithoutReIndex('Attributes Import - translations options')

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
        cy.fileSource('pub/media/importexport/test/attributes_testing_translation_update.csv',{force:true})

        //validate Import file
        cy.get('.source_check_button').click({force:true})
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity attribute')

        //check that specific values per stpre views were imported
        cy.get('#menu-magento-backend-stores').find('.item-catalog-attributes-attributes').find('a').as('goToAttributes')
        cy.get('@goToAttributes').click({force:true})
        cy.get('#attributeGrid_filter_attribute_code')
            .type('testing_translati',{force: true})
            .should('have.value', 'testing_translati')
            .type('{enter}')
        cy.get('.even > .col-attr-code').contains('testing_translation').click()
        cy.get('#attribute_label').should('have.value','Testing Translation')

        //Values of Your Attribute
        cy.get('.ignore-validate > :nth-child(1) > :nth-child(4) > .input-text').should('have.value','Blue')
        cy.get('.ignore-validate > :nth-child(1) > :nth-child(5) > .input-text').should('have.value','Blau')
        cy.get('.ignore-validate > :nth-child(1) > :nth-child(6) > .input-text').should('have.value','Blau2')
        cy.get('.ignore-validate > :nth-child(2) > :nth-child(4) > .input-text').should('have.value','Green')
        cy.get('.ignore-validate > :nth-child(2) > :nth-child(5) > .input-text').should('have.value','Grun')
        cy.get('.ignore-validate > :nth-child(2) > :nth-child(6) > .input-text').should('have.value','Grun2')
    })
})
