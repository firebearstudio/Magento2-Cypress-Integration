
context('Import Downloadable Products 1', () => {
    it('import downloadable product', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click({force:true})

        //specify general section
        cy.generalImportSectionWithoutReIndex('Import Downloadable Product')

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
        cy.fileSource('pub/media/importexport/test/downloadable_test_product.csv')

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
        cy.get('[name="sku"]').invoke('val', 'downloadable_test_product').trigger('change',{force:true})
        cy.get('[data-bind="i18n: \'Apply Filters\'"]',{timeout: 60000}).as('applyFiltersButton')
        cy.get('@applyFiltersButton').click({force:true})

        //check that the 'Links' section was imported successful
        cy.get('.admin__data-grid-wrap').contains('downloadable_test_product',{timeout: 60000})
        cy.get('.admin__data-grid-wrap').contains('downloadable_test_product').click({force:true});
        cy.get('[data-index="downloadable"]').find('[name="product[links_title]"]').should('have.value','Firebear links')
        cy.get('tbody').find('[name="downloadable[link][0][title]"]').should('have.value','Firebear title')
        cy.get('tbody').find('[name="downloadable[link][1][title]"]').should('have.value','Firebear title2')
        cy.get('tbody').find('[name="downloadable[link][2][title]"]').should('have.value','Firebear title3')
        cy.get('tbody').find('[name="downloadable[link][0][price]"]').should('have.value','89.00')
        cy.get('tbody').find('[name="downloadable[link][1][price]"]').should('have.value','90.00')
        cy.get('tbody').find('[name="downloadable[link][2][price]"]').should('have.value','78.00')
        //check values for the file attributes : type/url
        cy.get('tbody').find('[name="downloadable[link][0][type]"]').find('[value="url"]').should('be.selected')
        cy.get('tbody').find('[name="downloadable[link][0][link_url]"]').should('have.value','https://firebearstudio.com/media/logos/default/logo.png')
        cy.get('tbody').find('[name="downloadable[link][1][type]"]').find('[value="url"]').should('be.selected')
        cy.get('tbody').find('[name="downloadable[link][1][link_url]"]').should('have.value','https://firebearstudio.com/media/logos/default/logo.png')
        cy.get('tbody').find('[name="downloadable[link][2][type]"]').find('[value="url"]').should('be.selected')
        cy.get('tbody').find('[name="downloadable[link][2][link_url]"]').should('have.value','https://firebearstudio.com/media/logos/default/logo.png')
        //check values for the sample attributes : type/url
        cy.get('tbody').find('[name="downloadable[link][0][sample][type]"]').find('[value="url"]').should('be.selected')
        cy.get('tbody').find('[name="downloadable[link][0][sample][url]"]').should('have.value','https://firebearstudio.com/media/logos/default/logo.png')
        cy.get('tbody').find('[name="downloadable[link][1][sample][type]"]').find('[value="url"]').should('be.selected')
        cy.get('tbody').find('[name="downloadable[link][1][sample][url]"]').should('have.value','https://firebearstudio.com/media/logos/default/logo.png')
        cy.get('tbody').find('[name="downloadable[link][2][sample][type]"]').find('[value="url"]').should('be.selected')
        cy.get('tbody').find('[name="downloadable[link][2][sample][url]"]').should('have.value','https://firebearstudio.com/media/logos/default/logo.png')
        //check Shareable attribute's values
        cy.get('tbody').find('[name="downloadable[link][0][is_shareable]"]').find('[value="2"]').should('be.selected')
        cy.get('tbody').find('[name="downloadable[link][1][is_shareable]"]').find('[value="1"]').should('be.selected')
        cy.get('tbody').find('[name="downloadable[link][2][is_shareable]"]').find('[value="1"]').should('be.selected')
        //check Max. Downloads attribute's values
        cy.get('tbody').find('[name="downloadable[link][0][number_of_downloads]"]').should('have.value','10')
        cy.get('tbody').find('[name="downloadable[link][1][number_of_downloads]"]').should('have.value','9')
        cy.get('tbody').find('[name="downloadable[link][2][number_of_downloads]"]').should('have.value','7')

        //check that the 'Samples' section was imported successful
        cy.get('[data-index="downloadable"]').find('[name="product[samples_title]"]').should('have.value','Samples Title')
        cy.get('tbody').find('[name="downloadable[sample][0][title]"]').should('have.value','One')
        cy.get('tbody').find('[name="downloadable[sample][1][title]"]').should('have.value','Two')
        cy.get('tbody').find('[name="downloadable[sample][2][title]"]').should('have.value','Three')
        cy.get('tbody').find('[name="downloadable[sample][0][type]"]').find('[value="url"]').should('be.selected')
        cy.get('tbody').find('[name="downloadable[sample][1][type]"]').find('[value="url"]').should('be.selected')
        cy.get('tbody').find('[name="downloadable[sample][2][type]"]').find('[value="url"]').should('be.selected')
        cy.get('tbody').find('[name="downloadable[sample][0][sample_url]"]').should('have.value','https://files.fm/f/vsx3mqv6x')
        cy.get('tbody').find('[name="downloadable[sample][1][sample_url]"]').should('have.value','https://files.fm/f/3wqz5y4cu')
        cy.get('tbody').find('[name="downloadable[sample][2][sample_url]"]').should('have.value','https://firebearstudio.com/media/logos/default/logo.png')
    })
})
