
context('Deleting attribute that was created on fly 2', () => {
    it('deleting attr on fly ', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to the attributes grid
        cy.get('#menu-magento-backend-stores').find('.item-catalog-attributes-attributes').find('a').as('goToProductsGrid')
        cy.get('@goToProductsGrid').click({force:true})
        cy.get('[name="frontend_label"]').type('Fly{enter}')
        cy.wait(5000)
        cy.get('tbody').contains('fly',{timeout: 10000}).click({force:true})

        //checking Properties
        cy.get('[name="frontend_label[0]"]').should('have.value','Fly')
        cy.get('[name="frontend_input"]').find('[value="select"]').should('be.selected')
        cy.get('[name="is_required"]').find('[value="0"]').should('be.selected')
        cy.get('[data-index="attribute_options_select_container"]').contains('S')
        cy.get('#advanced_fieldset-wrapper').contains('Advanced Attribute Properties').click()
        cy.get('[name="attribute_code"]').should('have.value','fly')
        cy.get('[name="is_global"]').find('[value="1"]').should('be.selected')
        cy.get('[name="is_unique"]').find('[value="0"]').should('be.selected')
        cy.get('[name="frontend_class"]').find('[value]').should('be.selected')
        cy.get('[name="is_used_in_grid"]').find('[value="1"]').should('be.selected')
        cy.get('[name="is_filterable_in_grid"]').find('[value="1"]').should('be.selected')

        //checking Manage Labels
        cy.get('#product_attribute_tabs_labels').find('a').click()
        cy.get('[name="frontend_label[1]"]').should('have.value','Fly')

        //checking Storefront Properties
        cy.get('#product_attribute_tabs_front').find('a').click()
        cy.get('[name="is_searchable"]').find('[value="1"]').should('be.selected')
        cy.get('[name="search_weight"]').find('[value="3"]').should('be.selected')
        cy.get('[name="is_visible_in_advanced_search"]').find('[value="0"]').should('be.selected')
        cy.get('[name="is_comparable"]').find('[value="0"]').should('be.selected')
        cy.get('[name="is_filterable"]').find('[value="1"]').should('be.selected')
        cy.get('[name="is_filterable_in_search"]').find('[value="1"]').should('be.selected')
        cy.get('[name="position"]').should('have.value','2')
        cy.get('[name="is_used_for_promo_rules"]').find('[value="0"]').should('be.selected')
        cy.get('[name="is_html_allowed_on_front"]').find('[value="1"]').should('be.selected')
        cy.get('[name="is_visible_on_front"]').find('[value="1"]').should('be.selected')
        cy.get('[name="used_in_product_listing"]').find('[value="0"]').should('be.selected')
        cy.get('[name="used_for_sort_by"]').find('[value="1"]').should('be.selected')

        //deleting the attribute
        cy.get('#delete').click()
        cy.get('.modal-footer').find('.action-accept').click()
    })
})
