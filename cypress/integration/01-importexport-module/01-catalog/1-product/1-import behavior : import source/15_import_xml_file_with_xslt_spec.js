
context('Import Products Xml File Xslt Configuration 17', () => {
    it('xml - file - xslt - configuration', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click({force:true})

        //specify general section
        cy.generalImportSectionWithoutReIndex('Product Import - xml - file - xslt - configuration')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click({force:true})
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('catalog_product',{force:true});

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('update',{force:true});

        //specify Import Source section
        cy.get('.type_file').find('select').as('importSourceType')
        cy.get('@importSourceType').select('xml',{force:true});
        cy.fileSource('pub/media/importexport/test/products_B2C2_simpleproduct-20200414-153221.xml')
       
        //validate Import file
        cy.get('.source_check_button').click({force:true})
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //xslt configuration
        cy.get('[data-index="xml_conf"]').contains('XSLT Configuration').click()
        cy.get('[data-index="xslt_switch"]').find('.admin__actions-switch-label').click()
        cy.fixture('files/xslt.txt').then((xslt) => {
            cy.get('[data-index="xslt"]').find('textarea').invoke('val',xslt,{force: true}).trigger('input',{force: true})
        })
        //check that xslt validation is successful
        cy.get('[data-index="xslt_button"]').click()
        cy.get('[data-index="xml_conf"]').find('.xml_conf_xslt_result').contains('<?xml version="1.0" encoding="UTF-8"?>')
        cy.get('[data-index="xml_conf"]').should('not.have.class','admin__field-label')
    })
})
