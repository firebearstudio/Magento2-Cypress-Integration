context('Duplicate Export Job', () => {
    it('add update - csv - google sheet - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to export jobs page
        cy.get('.item-export-job').find('a').as('goToExportPageLink')
        cy.get('@goToExportPageLink').click({force:true})
        cy.get('.admin__data-grid-wrap',{timeout: 10000}).find('.data-grid-draggable').as('findGrid')
        cy.get('@findGrid').find('[data-repeat-index="0"]',{timeout: 10000}).as('auototestExportJobRow')
        cy.get('@auototestExportJobRow').find('.data-grid-actions-cell').find('a').click()

        //clicking on the duplicate export job button
        cy.get('.page-actions-buttons').find('#duplicate').click({force:true})
        cy.get('.modal-footer').find('.action-accept').click({force:true})
        cy.get('#messages').contains('You duplicate the job.',{timeout: 10000})
    })
})
