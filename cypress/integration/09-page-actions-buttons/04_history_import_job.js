context('History Import Jobs', () => {
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

        //click on the history import job button
        cy.get('.page-actions-buttons').find('#view_history').click({force:true})
        cy.get('.modal-inner-wrap',{timeout: 10000}).find('.modal-content')
    })
})
