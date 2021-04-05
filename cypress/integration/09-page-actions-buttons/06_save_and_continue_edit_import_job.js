context('Save And Continue Edit Import Jobs', () => {
    it('add update - csv - google sheet - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to import jobs page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})
        cy.get('.admin__data-grid-wrap',{timeout: 10000}).find('.data-grid-draggable').as('findGrid')
        cy.get('@findGrid').find('[data-repeat-index="0"]',{timeout: 10000}).as('auototestImportJobRow')
        cy.get('@auototestImportJobRow').find('.data-grid-actions-cell').find('a').click()
        cy.wait(15000)

        //click on the 'Save and Continue Edit' import job button
        cy.get('#save_and_continue').click({force:true})
        
        //check that import job was saved on the edit page
        cy.get('#messages',{timeout: 10000}).contains('Job was saved successfully.')
    })
})
