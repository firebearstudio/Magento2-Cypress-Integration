
context('Import Products', () => {
    it('changed values - physical gift card', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click({force:true})

        //specify general section
        cy.generalImportSectionWithoutReIndex('Physical Gift Card Import - changed values')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click({force:true})
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('catalog_product',{force:true});

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append',{force:true});

        //specify Import Source section
        cy.fileSource('pub/media/importexport/test/gift_test_products_with_changed_values.csv')

        //validate Import file
        cy.get('.source_check_button').click({force:true})
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()

        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity catalog_product')

        //check that products were created
        cy.get('#menu-magento-catalog-catalog').find('.item-catalog-products').find('a').as('goToProductsGrid')
        cy.get('@goToProductsGrid').click({force:true})
        cy.get('[data-bind="collapsible: {openClass: false, closeOnOuter: false}"]',{timeout: 60000}).find('button').as('filtersButton')
        cy.get('@filtersButton').click({force:true})
        cy.get('[name="sku"]').invoke('val', 'test-gift').trigger('change',{force:true})
        cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 60000}).as('applyFiltersButton')
        cy.get('@applyFiltersButton').click({force:true})
        cy.get('.admin__data-grid-outer-wrap').contains('3 records found',{timeout: 60000})

        //check that virtual gaftcard amount is right
        cy.get('.admin__data-grid-outer-wrap').contains('test-gift-physical-card',{timeout: 60000})
        cy.get('.admin__data-grid-outer-wrap').contains('test-gift-physical-card').click({force:true});
        cy.get('[data-index="giftcard_amounts"]',{timeout: 60000}).find('[name="product[giftcard_amounts][0][value]"]').should('have.value', '8.00')
        cy.get('[data-index="giftcard_amounts"]').find('[name="product[giftcard_amounts][1][value]"]').should('have.value', '9.00')
        cy.get('[data-index="giftcard_amounts"]').find('[name="product[giftcard_amounts][2][value]"]').should('have.value', '11.00')

        //check Open Amount is disabled
        cy.get('[data-index="allow_open_amount"]').find('[value="0"]')

        //check that gift type is 'Virtual'
        cy.get('[data-index="giftcard_type"]').find('[data-title="Physical"]').should('be.selected')

        //check Gift Card Information 
        cy.get('[data-index="giftcard-information"]').find('.admin__page-nav-item-messages').click({force:true})
        cy.get('[data-index="is_redeemable"]').find('[value="0"]')
        cy.get('[data-index="use_config_is_redeemable"]').find('input').should('not.be.checked')
        cy.get('[data-index="lifetime"]').find('input').should('have.value', '29')
        cy.get('[data-index="use_config_lifetime"]').find('input').should('not.be.checked')
        cy.get('[data-index="allow_message"]').find('[value="0"]')
        cy.get('[data-index="use_config_allow_message"]').find('input').should('not.be.checked')
        cy.get('[data-index="email_template"]').find('[data-title="Gift Card(s) Purchase (Default)"]').should('be.selected')
        cy.get('[data-index="use_config_email_template"]').find('input').should('not.be.checked')

        //check Gift Options 
        cy.get('[data-index="gift-options"]').find('.admin__page-nav-item-messages').click({force:true})
        cy.get('[data-index="gift_message_available"]').find('[value="1"]')
        cy.get('[data-index="use_config_gift_message_available"]').find('input').should('not.be.checked')
        cy.get('[data-index="gift_wrapping_available"]').find('[value="0"]')
        cy.get('[data-index="use_config_gift_wrapping_available"]').find('input').should('not.be.checked')
        cy.get('[data-index="gift_wrapping_price"]').find('input').should('have.value','19.00')
    })
})
