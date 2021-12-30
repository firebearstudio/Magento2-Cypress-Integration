
context('Deleting Created Category Mappings 6',() => {
    it('delete created category mappings', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to feed category mapping page
        cy.get('.item-mapping-index').find('a').as('goTocategoryMappingPage')
        cy.get('@goTocategoryMappingPage').click({force:true})

        //delete all mappings
        cy.get('table').find('.data-grid-checkbox-cell-inner',{timeout: 60000}).click({multiple:true})
        cy.get('.admin__data-grid-header-row').contains('Actions').as('actionsWithMultiple')
        cy.get('@actionsWithMultiple').click({force:true})
        cy.get('.action-menu-items').contains('Delete',{timeout: 60000})
        cy.get('.action-menu-items').contains('Delete').click({force:true})
        cy.get('.modal-footer').find('.action-accept').click({force:true})
    })
})
