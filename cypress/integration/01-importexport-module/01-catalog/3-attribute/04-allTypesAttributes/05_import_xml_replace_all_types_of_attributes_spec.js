
context('Import Attributes Xml All Types 5', () => {
    it('all types - replace - xml - file - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Attributes Import - xml - replace - All Types')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('attribute',{force:true});

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('replace',{force:true});

        //specify Import Source section
        cy.get('.type_file').find('select').as('importSourceType')
        cy.get('@importSourceType').select('xml',{force:true});
        cy.fileSource('pub/media/importexport/test/attributes_all_types.xml',{force:true})

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //save and run process
        cy.get('#save_and_run').click({force:true})
        cy.get('.run').click()
    
        //check Import results
        cy.consoleImportResultWithoutReIndex('Entity attribute')
    })

    it('checking import attribute test_text_filed', () => {

        cy.loginToAdminPanel('ee')

        //check that values were replaced
        cy.get('#menu-magento-backend-stores').find('.item-catalog-attributes-attributes').find('a').as('goToAttributes')
        cy.get('@goToAttributes').click({force:true})
        cy.get('#attributeGrid_filter_attribute_code')
            .type('test_text_file',{force: true})
            .should('have.value', 'test_text_file')
            .type('{enter}')
        cy.get('#attributeGrid').contains('1 records found')  
        cy.get('.even > .col-attr-code').contains('test_text_filed').click()
        cy.get('#attribute_label').should('have.value','test_text_filed')
        cy.get('#frontend_input').should('have.value','text')
        cy.get('#is_required').should('have.value','0')
        cy.get('#advanced_fieldset-wrapper > .fieldset-wrapper-title > .admin__collapsible-title').click()
        cy.get('#attribute_code').should('have.value','test_text_filed')
        cy.get('#is_global').should('have.value','0')
        cy.get('#default_value_text').should('be.empty')
        cy.get('#is_unique').should('have.value','0')
        cy.get('#frontend_class').should('have.value','')
        cy.get('#is_used_in_grid').should('have.value','1')
        //manage labels
        cy.get('#product_attribute_tabs_labels').click()
        //store front properties
        cy.get('#product_attribute_tabs_front').click()
        cy.get('#is_searchable').should('have.value','0')
        cy.get('#is_comparable').should('have.value','0')
        cy.get('#is_filterable').should('have.value','0')
        cy.get('#is_filterable_in_search').should('have.value','0')
        cy.get('#position').should('have.value','0')
        cy.get('#is_used_for_promo_rules').should('have.value','0')
        cy.get('#is_html_allowed_on_front').should('have.value','1')
        cy.get('#is_visible_on_front').should('have.value','0')
        cy.get('#used_in_product_listing').should('have.value','0')
        cy.get('#used_for_sort_by').should('have.value','0')
    })

    it('checking import attribute test_text_area', () => {

        cy.loginToAdminPanel('ee')

        //check that values were replaced
        cy.get('#menu-magento-backend-stores').find('.item-catalog-attributes-attributes').find('a').as('goToAttributes')
        cy.get('@goToAttributes').click({force:true})
        cy.get('#attributeGrid_filter_attribute_code')
            .type('test_text_are',{force: true})
            .should('have.value', 'test_text_are')
            .type('{enter}')
        cy.get('#attributeGrid').contains('1 records found')  
        cy.get('.even > .col-attr-code').contains('test_text_area').click()
        cy.get('#attribute_label').should('have.value','test_text_area')
        cy.get('#frontend_input').should('have.value','textarea')
        cy.get('#is_required').should('have.value','0')
        cy.get('#advanced_fieldset-wrapper > .fieldset-wrapper-title > .admin__collapsible-title').click()
        cy.get('#attribute_code').should('have.value','test_text_area')
        cy.get('#is_global').should('have.value','0')
    })

    it('checking import attribute test_text_editor', () => {

        cy.loginToAdminPanel('ee')

        //check that values were replaced
        cy.get('#menu-magento-backend-stores').find('.item-catalog-attributes-attributes').find('a').as('goToAttributes')
        cy.get('@goToAttributes').click({force:true})
        cy.get('#attributeGrid_filter_attribute_code')
            .type('test_text_edito',{force: true})
            .should('have.value', 'test_text_edito')
            .type('{enter}')
        cy.get('#attributeGrid').contains('1 records found')  
        cy.get('.even > .col-attr-code').contains('test_text_editor').click()
        cy.get('#attribute_label').should('have.value','test_text_editor')
        cy.get('#frontend_input').should('have.value','texteditor')
        cy.get('#is_required').should('have.value','0')
        cy.get('#advanced_fieldset-wrapper > .fieldset-wrapper-title > .admin__collapsible-title').click()
        cy.get('#attribute_code').should('have.value','test_text_editor')
        cy.get('#is_global').should('have.value','0')
    })
    it('checking import attribute test_page_builder', () => {

        cy.loginToAdminPanel('ee')

        //check that values were replaced
        cy.get('#menu-magento-backend-stores').find('.item-catalog-attributes-attributes').find('a').as('goToAttributes')
        cy.get('@goToAttributes').click({force:true})
        cy.get('#attributeGrid_filter_attribute_code')
            .type('test_page_builde',{force: true})
            .should('have.value', 'test_page_builde')
            .type('{enter}')
        cy.get('#attributeGrid').contains('1 records found')  
        cy.get('.even > .col-attr-code').contains('test_page_builder').click()
        cy.get('#attribute_label').should('have.value','test_page_builder')
        cy.get('#frontend_input').should('have.value','pagebuilder')
        cy.get('#is_required').should('have.value','0')
        cy.get('#advanced_fieldset-wrapper > .fieldset-wrapper-title > .admin__collapsible-title').click()
        cy.get('#attribute_code').should('have.value','test_page_builder')
        cy.get('#is_global').should('have.value','0')
    })
    
    it('checking import attribute test_date_time', () => {

        cy.loginToAdminPanel('ee')

        //check that values were replaced
        cy.get('#menu-magento-backend-stores').find('.item-catalog-attributes-attributes').find('a').as('goToAttributes')
        cy.get('@goToAttributes').click({force:true})
        cy.get('#attributeGrid_filter_attribute_code')
            .type('test_date_tim',{force: true})
            .should('have.value', 'test_date_tim')
            .type('{enter}')
        cy.get('.even > .col-attr-code').contains('test_date_time').click()
        cy.get('#attribute_label').should('have.value','test_date_time')
        cy.get('#frontend_input').should('have.value','datetime')
        cy.get('#is_required').should('have.value','0')
        cy.get('#advanced_fieldset-wrapper > .fieldset-wrapper-title > .admin__collapsible-title').click()
        cy.get('#attribute_code').should('have.value','test_date_time')
        cy.get('#is_global').should('have.value','0')
    })
    it('checking import attribute test_boolean', () => {

        cy.loginToAdminPanel('ee')

        //check that values were replaced
        cy.get('#menu-magento-backend-stores').find('.item-catalog-attributes-attributes').find('a').as('goToAttributes')
        cy.get('@goToAttributes').click({force:true})
        cy.get('#attributeGrid_filter_attribute_code')
            .type('test_boolea',{force: true})
            .should('have.value', 'test_boolea')
            .type('{enter}')
        cy.get('.even > .col-attr-code').contains('test_boolean').click()
        cy.get('#attribute_label').should('have.value','test_boolean')
        cy.get('#frontend_input').should('have.value','boolean')
        cy.get('#is_required').should('have.value','0')
        cy.get('#advanced_fieldset-wrapper > .fieldset-wrapper-title > .admin__collapsible-title').click()
        cy.get('#attribute_code').should('have.value','test_boolean')
        cy.get('#is_global').should('have.value','0')
    })
    it('checking import attribute test_multiple_select', () => {

        cy.loginToAdminPanel('ee')

        //check that values were replaced
        cy.get('#menu-magento-backend-stores').find('.item-catalog-attributes-attributes').find('a').as('goToAttributes')
        cy.get('@goToAttributes').click({force:true})
        cy.get('#attributeGrid_filter_attribute_code')
            .type('test_multiple_selec',{force: true})
            .should('have.value', 'test_multiple_selec')
            .type('{enter}')
        cy.get('.even > .col-attr-code').contains('test_multiple_select').click()
        cy.get('#attribute_label').should('have.value','test_multiple_select')
        cy.get('#frontend_input').should('have.value','multiselect')
        cy.get('#is_required').should('have.value','0')
        cy.get('#advanced_fieldset-wrapper > .fieldset-wrapper-title > .admin__collapsible-title').click()
        cy.get('#attribute_code').should('have.value','test_multiple_select')
        cy.get('#is_global').should('have.value','0')
        //Values of Your Attribute
        cy.get('.ignore-validate > :nth-child(1) > :nth-child(3) > .input-text').should('have.value','first')
        cy.get('.ignore-validate > :nth-child(1) > :nth-child(4) > .input-text').should('have.value','first default')
        cy.get('.ignore-validate > :nth-child(2) > :nth-child(3) > .input-text').should('have.value','second')
        cy.get('.ignore-validate > :nth-child(2) > :nth-child(4) > .input-text').should('have.value','second default')
        cy.get('.ignore-validate > :nth-child(3) > :nth-child(3) > .input-text').should('have.value','third')
        cy.get('.ignore-validate > :nth-child(3) > :nth-child(4) > .input-text').should('have.value','third deafult')
    })

    it('checking import attribute test_dropdown', () => {

        cy.loginToAdminPanel('ee')

        //check that values were replaced
        cy.get('#menu-magento-backend-stores').find('.item-catalog-attributes-attributes').find('a').as('goToAttributes')
        cy.get('@goToAttributes').click({force:true})
        cy.get('#attributeGrid_filter_attribute_code')
            .type('test_dropdow',{force: true})
            .should('have.value', 'test_dropdow')
            .type('{enter}')
        cy.get('.even > .col-attr-code').contains('test_dropdown').click()
        cy.get('#attribute_label').should('have.value','test_dropdown')
        cy.get('#frontend_input').should('have.value','select')
        cy.get('#is_required').should('have.value','0')
        cy.get('#advanced_fieldset-wrapper > .fieldset-wrapper-title > .admin__collapsible-title').click()
        cy.get('#attribute_code').should('have.value','test_dropdown')
        cy.get('#is_global').should('have.value','0')
        //Values of Your Attribute
        cy.get('.ignore-validate > :nth-child(1) > :nth-child(3) > .input-text').should('have.value','one')
        cy.get('.ignore-validate > :nth-child(1) > :nth-child(4) > .input-text').should('have.value','one default')
        cy.get('.ignore-validate > :nth-child(2) > :nth-child(3) > .input-text').should('have.value','two')
        cy.get('.ignore-validate > :nth-child(2) > :nth-child(4) > .input-text').should('have.value','two deafult')
        cy.get('.ignore-validate > :nth-child(3) > :nth-child(3) > .input-text').should('have.value','three')
        cy.get('.ignore-validate > :nth-child(3) > :nth-child(4) > .input-text').should('have.value','three default')
    })
    it('checking import attribute test_price', () => {

        cy.loginToAdminPanel('ee')

        //check that values were replaced
        cy.get('#menu-magento-backend-stores').find('.item-catalog-attributes-attributes').find('a').as('goToAttributes')
        cy.get('@goToAttributes').click({force:true})
        cy.get('#attributeGrid_filter_attribute_code')
            .type('test_pric',{force: true})
            .should('have.value', 'test_pric')
            .type('{enter}')
        cy.get('.even > .col-attr-code').contains('test_price').click()
        cy.get('#attribute_label').should('have.value','test_price')
        cy.get('#frontend_input').should('have.value','price')
        cy.get('#is_required').should('have.value','0')
        cy.get('#advanced_fieldset-wrapper > .fieldset-wrapper-title > .admin__collapsible-title').click()
        cy.get('#attribute_code').should('have.value','test_price')
        cy.get('#is_global').should('have.value','0')
    })
    it('checking import attribute test_media_image', () => {

        cy.loginToAdminPanel('ee')

        //check that values were replaced
        cy.get('#menu-magento-backend-stores').find('.item-catalog-attributes-attributes').find('a').as('goToAttributes')
        cy.get('@goToAttributes').click({force:true})
        cy.get('#attributeGrid_filter_attribute_code')
            .type('test_media_imag',{force: true})
            .should('have.value', 'test_media_imag')
            .type('{enter}')
        cy.get('.even > .col-attr-code').contains('test_media_image').click()
        cy.get('#attribute_label').should('have.value','test_media_image')
        cy.get('#frontend_input').should('have.value','media_image')
        cy.get('#is_required').should('have.value','0')
        cy.get('#advanced_fieldset-wrapper > .fieldset-wrapper-title > .admin__collapsible-title').click()
        cy.get('#attribute_code').should('have.value','test_media_image')
        cy.get('#is_global').should('have.value','2')
    })
   
    it('checking import attribute test_visual_swatch', () => {

        cy.loginToAdminPanel('ee')

        //check that values were replaced
        cy.get('#menu-magento-backend-stores').find('.item-catalog-attributes-attributes').find('a').as('goToAttributes')
        cy.get('@goToAttributes').click({force:true})
        cy.get('#attributeGrid_filter_attribute_code')
            .type('test_visual_swatc',{force: true})
            .should('have.value', 'test_visual_swatc')
            .type('{enter}')
        cy.get('.even > .col-attr-code').contains('test_visual_swatch').click()
        cy.get('#attribute_label').should('have.value','test_visual_swatch')
        cy.get('#frontend_input').should('have.value','swatch_visual')
        cy.get('#is_required').should('have.value','0')
        cy.get('#advanced_fieldset-wrapper > .fieldset-wrapper-title > .admin__collapsible-title').click()
        cy.get('#attribute_code').should('have.value','test_visual_swatch')
        cy.get('#is_global').should('have.value','0')

        //Values of Your Attribute
        cy.get('.ignore-validate > :nth-child(1) > :nth-child(4) > .input-text').should('have.value','pink')
        cy.get('.ignore-validate > :nth-child(1) > :nth-child(5) > .input-text').should('have.value','pink default')
        cy.get('.ignore-validate > :nth-child(2) > :nth-child(4) > .input-text').should('have.value','purple')
        cy.get('.ignore-validate > :nth-child(2) > :nth-child(5) > .input-text').should('have.value','purple default')
        cy.get('.ignore-validate > :nth-child(3) > :nth-child(4) > .input-text').should('have.value','red')
        cy.get('.ignore-validate > :nth-child(3) > :nth-child(5) > .input-text').should('have.value','red default')
    })

    it('checking import attribute test_text_swatch', () => {

        cy.loginToAdminPanel('ee')

        //check that values were replaced
        cy.get('#menu-magento-backend-stores').find('.item-catalog-attributes-attributes').find('a').as('goToAttributes')
        cy.get('@goToAttributes').click({force:true})
        cy.get('#attributeGrid_filter_attribute_code')
            .type('test_text_swatc',{force: true})
            .should('have.value', 'test_text_swatc')
            .type('{enter}')
        cy.get('.even > .col-attr-code').contains('test_text_swatch').click()
        cy.get('#attribute_label').should('have.value','test_text_swatch')
        cy.get('#frontend_input').should('have.value','swatch_text')
        cy.get('#is_required').should('have.value','0')
        cy.get('#advanced_fieldset-wrapper > .fieldset-wrapper-title > .admin__collapsible-title').click()
        cy.get('#attribute_code').should('have.value','test_text_swatch')
        cy.get('#is_global').should('have.value','0')

        //Values of Your Attribute
        cy.get('.ignore-validate > :nth-child(1) > :nth-child(3) > .input-text').should('have.value','test')
        cy.get('.ignore-validate > :nth-child(1) > :nth-child(4) > .input-text').should('have.value','one')
        cy.get('.ignore-validate > :nth-child(1) > :nth-child(5) > .input-text').should('have.value','test def')
        cy.get('.ignore-validate > :nth-child(1) > :nth-child(6) > .input-text').should('have.value','one def')
        cy.get('.ignore-validate > :nth-child(2) > :nth-child(3) > .input-text').should('have.value','test2')
        cy.get('.ignore-validate > :nth-child(2) > :nth-child(4) > .input-text').should('have.value','two')
        cy.get('.ignore-validate > :nth-child(2) > :nth-child(5) > .input-text').should('have.value','test2 def')
        cy.get('.ignore-validate > :nth-child(2) > :nth-child(6) > .input-text').should('have.value','two def')
        cy.get('.ignore-validate > :nth-child(3) > :nth-child(3) > .input-text').should('have.value','test3')
        cy.get('.ignore-validate > :nth-child(3) > :nth-child(4) > .input-text').should('have.value','three')
        cy.get('.ignore-validate > :nth-child(3) > :nth-child(5) > .input-text').should('have.value','test3 def')
        cy.get('.ignore-validate > :nth-child(3) > :nth-child(6) > .input-text').should('have.value','three def')
    })


})
