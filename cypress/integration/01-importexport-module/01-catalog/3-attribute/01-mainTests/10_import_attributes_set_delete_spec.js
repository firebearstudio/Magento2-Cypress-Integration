context('Import Attributes Set Delete 10', () => {
    it('attributes set - delete', () => {
        //login
        cy.loginToAdminPanel('ee')
        cy.intercept({
            url: `/static/version1678102584/adminhtml/Magento/spectrum/en_US/Magento_AdminNotification/template/grid/cells/message.html`,
            method: 'get'
          }).as('message')

        //Delete Attribute sets were created on fly 
        cy.get('#menu-magento-backend-stores').find('.item-catalog-attributes-sets').find('a').as('goToAttributesSet')
        cy.get('@goToAttributesSet').click({force:true})
        cy.wait(10000)
        cy.get('table').contains('Test attribute set2',{timeout: 10000}).click()
        cy.get('.page-actions-buttons').find('[title="Delete"]').click()
        cy.get('.action-primary').click()
        cy.wait(10000)
        cy.get('table').contains('Test attribute set',{timeout: 10000}).click()
        cy.get('.page-actions-buttons').find('[title="Delete"]').click()
        cy.get('.action-primary').click()
    })
})
