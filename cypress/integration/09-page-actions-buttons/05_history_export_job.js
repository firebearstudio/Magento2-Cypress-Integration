context('History Export Jobs', () => {
    it('add update - csv - google sheet - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to export page
        cy.get('.item-export-job').find('a').as('goToExportPageLink')
        cy.get('@goToExportPageLink').click({force:true})

        //go to Export Jobs page
        cy.get('.item-export-job').find('a').as('goToExportPageLink')
        cy.get('@goToExportPageLink').click({force:true})
        cy.get('.admin__data-grid-wrap',{timeout: 10000}).find('.data-grid-draggable').as('findGrid')
        cy.get('@findGrid').find('[data-repeat-index="0"]',{timeout: 10000}).as('auototestExportJobRow')
        cy.get('@auototestExportJobRow').find('.data-grid-actions-cell').find('a').click({force:true})

        //click on the history export job button
        cy.get('.page-actions-buttons',{timeout: 10000}).find('#view_history').click({force:true})
        cy.get('.modal-inner-wrap',{timeout: 10000}).find('.modal-content')
    })
})
