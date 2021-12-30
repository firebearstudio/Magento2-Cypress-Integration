context('Import Companies Add Update Csv Googlesheet 1', () => {
    it('add update - csv - google sheet - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSection('Companies Import - add update - csv - google sheet')
        cy.get('[data-index="indexers"]').find('.admin__control-multiselect').as('indexManagement')
        cy.get('@indexManagement').select('customer_grid',{force:true})

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('company');

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('add_update');

        //specify Import Source section
        cy.googlePathSource('https://docs.google.com/spreadsheets/d/1ASaPIdt8RrZfIP3f1ZmSPG9CQzAYMTNdfzQEhe38bPE/edit#gid=2087652436')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResult('Entity company')

        //check that  companies were added
        cy.get('#menu-magento-customer-customer').find('.item-company-index').find('a').as('goToCompaniesGrid')
        cy.get('@goToCompaniesGrid').click({force:true})
        cy.get('table').contains('FireBear')
        cy.get('table').contains('Microsoft')
        cy.get('table').contains('Apple')

        //apply the filter for FireBear company
        cy.get('[data-bind="collapsible: {openClass: false, closeOnOuter: false}"]',{timeout: 60000}).find('button').as('filtersButton')
        cy.get('@filtersButton').click({force:true})  
        cy.get('.admin__form-field-control').find('[name="company_name"]').invoke('val','FireBear').trigger('change')
        cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 60000}).as('applyFiltersButton')
        cy.get('@applyFiltersButton').click({force:true})
        cy.get('.admin__data-grid-outer-wrap').contains('1 records found',{timeout: 60000})
        cy.get('.admin__data-grid-wrap').contains('Edit',{timeout: 60000})
        cy.get('.admin__data-grid-wrap').contains('Edit').click({force:true})
       
        //check that email was imported 
        cy.get('[name="general[company_email]"]').should('have.value','email@firebear.com')

        //check that Acount Information was imported 
        cy.get('[data-index="information"]').find('.admin__page-nav-item-messages').click({force:true})
        cy.get('[data-index="legal_name"]').find('input').should('have.value','FireBear')
        cy.get('[data-index="comment"]').find('textarea').should('have.value','FireBear Company')

        //check that Legal Address was imported 
        cy.get('[data-index="address"]').find('.admin__page-nav-item-messages').click({force:true})
        cy.get('[data-index="street"]').find('input').should('have.value','street')
        cy.get('[data-index="city"]').find('input').should('have.value','Moscow')
        cy.get('[data-index="country_id"]').find('[name="address[country_id]"]').find('[value="RU"]').should('be.selected')
        cy.get('[data-index="region_id_input"]').find('input').should('have.value','Moscow region')
        cy.get('[data-index="postcode"]').find('input').should('have.value','12888')
        cy.get('[data-index="telephone"]').find('input').should('have.value','3444')

        //check that Company Admin was imported 
        cy.get('[data-index="company_admin"]').find('.admin__page-nav-item-messages').click({force:true})
        cy.get('[data-index="job_title"]').find('input').should('have.value','Director')
        cy.get('[data-index="email"]').find('input').should('have.value','john@gmail.com')
        cy.get('[data-index="prefix"]').find('input').should('have.value','Mr.')
        cy.get('[data-index="firstname"]').find('input').should('have.value','John')
        cy.get('[data-index="middlename"]').find('input').should('have.value','Jr.')
        cy.get('[data-index="lastname"]').find('input').should('have.value','Smitt')
        cy.get('[data-index="suffix"]').find('input').should('have.value','esq.')
        cy.get('[data-index="gender"]').find('[name="company_admin[gender]"]').find('[value="3"]').should('be.selected')
        cy.get('[data-index="sendemail_store_id"]').find('select').find('[value="1"]').should('be.selected')

        //check that Company Credit was imported 
        cy.get('[data-index="company_credit"]').find('.admin__page-nav-item-messages').click({force:true})
        cy.get('.admin__scope-old').contains('$10,000.00')
        cy.get('.admin__scope-old').contains('$10,067.00')
        cy.get('.admin__scope-old').contains('$67.00')
        cy.get('[data-index="company_credit"]').find('table').contains('$10,000.00')
        cy.get('[data-index="company_credit"]').find('table').contains('$10,067.00')
        cy.get('[data-index="company_credit"]').find('table').contains('$67.00')
        cy.get('[data-index="credit_limit"]').find('input').should('have.value','67.00')
        cy.get('[data-index="exceed_limit"]').find('[value="true"]')

        //check that Advanced Settings was imported 
        cy.get('[data-index="settings"]').find('.admin__page-nav-item-messages').click({force:true})
        cy.get('[data-index="is_quote_enabled"]').find('[value="true"]')

        //reset filter
        cy.get('#back').click({force:true})
        cy.get('.admin__data-grid-filters-current').contains('Clear all').click()  
    })
})