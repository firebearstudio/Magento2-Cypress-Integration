context('Import Companies', () => {
    it('delete - export file - csv - sftp - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSection('Companies Import - export file - delete - csv - sftp')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('company');

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('delete');

        //specify Import Source section
        cy.specifySftpSource('importSftp','/var/www/alex/files/test/export_company.csv')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResult('Entity company')

        //check that  companies were deleted
        cy.get('#menu-magento-customer-customer').find('.item-company-index').find('a').as('goToCompaniesGrid')
        cy.get('@goToCompaniesGrid').click({force:true})
        cy.get('[data-bind="text: $col.getLabel($row())"]').contains('FireBear').should('not.exist')
    })
})
 //нужно сделать сначала тест по экспорту с фильтром тех компаний которые импортировались в гугл шит 
 //потом этот файл сделать импорт delete и проверка на то что файла нет , так как если будут удаляться 
 //все компании дальше будут падать тесты где используется company_id