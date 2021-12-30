context('Save Export Jobs', () => {
    it('add update - csv - google sheet - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to Export Jobs page
        cy.get('.item-export-job').find('a').as('goToExportPageLink')
        cy.get('@goToExportPageLink').click({force:true})
        cy.get('.admin__data-grid-wrap',{timeout: 10000}).find('.data-grid-draggable').as('findGrid')
        cy.get('@findGrid').find('[data-repeat-index="0"]',{timeout: 10000}).as('auototestExportJobRow')
        cy.get('@auototestExportJobRow').find('.data-grid-actions-cell').find('a').click()
        cy.wait(15000)

        //click on the 'Save' export job button
        cy.get('.page-actions-buttons',{timeout: 10000}).find('#save').click({force:true})
        
        //check that export job was saved on the edit page
        cy.get('#messages',{timeout: 10000}).contains('You saved the export.')
    })
})
