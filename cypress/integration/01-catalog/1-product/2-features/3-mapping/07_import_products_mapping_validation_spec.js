
context('Import Products Mapping Validation 7', () => {
    it(' mapping validation - csv - all sources - new job', () => {
        //login
        cy.loginToAdminPanel('ee')

        //go to import page
        cy.get('.item-import-job').find('a').as('goToImportPageLink')
        cy.get('@goToImportPageLink').click({force:true})

        //go to new job page
        cy.get('#add').as('addJobButton')
        cy.get('@addJobButton').click()

        //specify general section
        cy.generalImportSectionWithoutReIndex('Product Import - Mapping Validation')

        //specify Import Settings section
        cy.get('.fieldset_settings').find('.fieldset-wrapper-title').as('fieldsetSettings')
        cy.get('@fieldsetSettings').click()
        cy.get('.settings_entity').find('select').as('settingsEntity')
        cy.get('@settingsEntity').select('catalog_product',{force:true});

        //specify Import Behavior section
        cy.get('.fieldset_behavior').find('.fieldset-wrapper-title').as('fieldsetBehaviour')
        cy.get('.behavior_behavior').find('select').as('behaviorBehavior')
        cy.get('@behaviorBehavior').select('append',{force:true});

        //specify Import Source section - File
        cy.fileSource('pub/media/importexport/test/products_for_mapping_checking.csv')
       
        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000})

        //map validation - File
        cy.get('[data-index="validate_button"]').click()
        cy.get('[data-index="source_data_map_container"]').find('.admin__field-success',{timeout: 20000}).contains('Import data validation is complete.')
        cy.addMappingRowImport('.record-1','sku','sku')
        cy.addMappingRowImport('.record-2','price','price')
        cy.addMappingRowImport('.record-3','url_key','url_key')

        //specify Import Source section - URL
        cy.urlSource('https://4af610548f-253334.nxcli.net/media/importexport/test/product_all_types.csv')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000}) 

        //map validation - URL
        cy.get('[data-index="validate_button"]').click()
        cy.get('[data-index="source_data_map_container"]').find('.admin__field-success',{timeout: 20000}).contains('Import data validation is complete.')

        //specify Import Source section - SFTP
        cy.specifySftpSource('importSftp','/chroot/home/a0563af8/develop-gold.dev.firebearstudio.com/pub/media/importexport/test/product_all_types.csv')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000}) 

        //map validation - SFTP
        cy.get('[data-index="validate_button"]').click()
        cy.get('[data-index="source_data_map_container"]').find('.admin__field-success',{timeout: 20000}).contains('Import data validation is complete.')

        //specify Import Source section - Dropbox
        cy.dropboxSource('/product_all_types.csv')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000}) 

        //map validation - Dropbox
        cy.get('[data-index="validate_button"]').click()
        cy.get('[data-index="source_data_map_container"]').find('.admin__field-success',{timeout: 20000}).contains('Import data validation is complete.')

        //specify Import Source section - GOOGLESHEET
        cy.googlePathSource('https://docs.google.com/spreadsheets/d/13FemIzzexF5koAdQYjbcKscqoCfXyknYWkQkbSZGPsk/edit#gid=1164219475')

        //validate Import file
        cy.get('.source_check_button').click()
        cy.get('.fieldset_source').contains('File validated successfully',{timeout: 60000}) 

        //map validation - GOOGLESHEET
        cy.get('[data-index="validate_button"]').click()
        cy.get('[data-index="source_data_map_container"]').find('.admin__field-success',{timeout: 20000}).contains('Import data validation is complete.')
    })
})
