
context('Create Facebook Category Mapping 2',() => {
    it('create facebook category mapping', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to feed category mapping page
        cy.get('.item-mapping-index').find('a').as('goTocategoryMappingPage')
        cy.get('@goTocategoryMappingPage').click({force:true})

        //add new mapping
        cy.get('#add',{timeout: 20000}).click()
        cy.get('[data-index="title"]').find('input').type('Facebook',{force: true})
        cy.get('[data-index="type_id"]').find('select').select('Facebook',{force: true})
        cy.get('[data-index="button_connect"]').click()
        cy.get('[data-index="source_category_map_container"]').find('strong').click()
        //add first mapping row
        cy.get('[data-action="add_new_row"]').click()
        cy.get('[name="source_category_map[0][source_category_magento]"]').select('Default category/Women/Tops/Hoodies & Sweatshirts')
        cy.get('[data-index="source_category_feed"]').eq(0).find('.action-menu').invoke('show').type('{enter}')
        cy.get('[data-index="source_category_feed"]').eq(0).find('input[type="text"]').type('new',{force: true})
        cy.get('[data-index="source_category_feed"]').find('.action-menu').contains('Media > Magazines & Newspapers',{timeout: 20000}).click({force: true})
        //add second mapping row
        cy.get('[data-action="add_new_row"]').click()
        cy.get('[data-index="source_category_feed"]').find('.action-menu').invoke('show').type('{enter}')
        cy.get('[data-index="source_category_feed"]').find('input[type="text"]').eq(1).type('new',{force: true})
        cy.get('[data-index="source_category_feed"]').find('.action-menu').eq(1).contains('Media > Magazines & Newspapers',{timeout: 20000}).click({force: true})
        cy.get('[data-action="add_new_row"]').click()
        //add third mapping row
        cy.get('[name="source_category_map[2][source_category_magento]"]').select('Default category/Collections/Performance Fabrics')
        cy.get('[data-index="source_category_feed"]').find('.action-menu').eq(2).invoke('show').type('{enter}')
        cy.get('[data-index="source_category_feed"]').find('input[type="text"]').eq(2).type('new',{force: true})
        cy.get('[data-index="source_category_feed"]').find('.action-menu').eq(2).contains('Media > Magazines & Newspapers',{timeout: 20000}).click({force: true})

        //save the mapping
        cy.get('#save').click()

    })
})
