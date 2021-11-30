//const for enter to Admin panel
const urlToMagentoLocal = '***'; //admin url
const usernameForLocal = '***'; //admin username
const passwordForLocal = '***'; //admin password
const urlToMagentoCE = '***'; //admin url
const usernameForCE = '***'; //admin username
const passwordForCE = '***'; //admin password
const urlToMagentoEE = '***'; //admin url
const usernameForEE = '***'; //admin username
const passwordForEE = '***'; //admin password

//Enter to admin Panel
Cypress.Commands.add('loginToAdminPanel' , (magentoVersion) => {
    if(magentoVersion == 'ce'){
        var url = urlToMagentoCE;
        var username = usernameForCE;
        var password = passwordForCE
    }else if(magentoVersion == 'ee') {
        var url = urlToMagentoEE;
        var username = usernameForEE;
        var password = passwordForEE
    }else{
        var url = urlToMagentoLocal;
        var username = usernameForLocal;
        var password = passwordForLocal
    }
    cy.visit(url)
    cy.get('#username')
        .type(username).should('have.value', username)
    cy.get('#login')
        .type(password).should('have.value', password)
    cy.get('.actions').find('button').as('loginButton')
    cy.get('@loginButton').click()
})

//const for enter to Front-End panel
const urlToFrontEndEE= '***'; //front-end page url
const usernameForFrontEndEE = '***'; //admin username
const passwordForFrontEndEE = '***'; //admin password

//Enter to front-end Panel
Cypress.Commands.add('loginToFrontEndPanel' , () => {
    cy.visit(urlToFrontEndEE)
    cy.get('.page-header').find('.authorization-link').find('a').click({force:true})
    cy.get('#email')
        .type(usernameForFrontEndEE).should('have.value',usernameForFrontEndEE)
    cy.get('#pass')
        .type(passwordForFrontEndEE).should('have.value', passwordForFrontEndEE)
    cy.get('#send2').as('loginButton')
    cy.get('@loginButton').click()
})

//Log out from admin Panel
Cypress.Commands.add('logoutFromAdminPanel',() => {
    cy.get('.admin-user').find('.admin__action-dropdown').as('testingButton')
    cy.get('@testingButton').click({force:true})
    cy.get('.admin__action-dropdown-menu').find('.account-signout').as('signOutButton')
    cy.get('@signOutButton').click({force:true})
})

//General section for import
Cypress.Commands.add('generalImportSection' , jobName  => {
    cy.get('.general_is_active',{timeout: 60000}).find('.admin__actions-switch-label').as('generalIsActive')
    cy.get('@generalIsActive').click({force:true})
    cy.get('.general_title ').find('input')
        .type(jobName)
        .should('have.value', jobName)
    cy.get('.general_reindex').find('.admin__actions-switch-label').as('generalReindex')
    cy.get('@generalReindex').click()
})

//Const for sftp source
//data for sftp server
const sftpHost = '***';
const sftpPort = '***';
const sftpUserName = '***';
const sftpPassword = '***';
//export
const exportSourceSftp = '.source_export_source_entity';
const exportFilePathSftp = '.export_source_sftp_file_path';
const sftpHostExport = '.export_source_sftp_host';
const sftpPortExport = '.export_source_sftp_port';
const sftpNameExport = '.export_source_sftp_username';
const sftpPasswordExport = '.export_source_sftp_password';
//import
const importSourceSftp = '.import_source';
const importFilePathSftp = '.sftp_file_path';
const sftpHostImport = '.sftp_host';
const sftpPortImport = '.sftp_port';
const sftpNameImport = '.sftp_username';
const sftpPasswordImport = '.sftp_password';

//Choose sftp source and sftp data input
Cypress.Commands.add('specifySftpSource' , (sourceEntityProcess,filePath) => {
    if(sourceEntityProcess == 'importSftp'){
        var source = importSourceSftp;
        var filePathSftp = importFilePathSftp;
        var sourceSftpHost = sftpHostImport;
        var sourceSftpPort = sftpPortImport;
        var sourceSftpName = sftpNameImport;
        var sourceSftpPassword = sftpPasswordImport;
    }else{
        var source = exportSourceSftp;
        var filePathSftp = exportFilePathSftp;
        var sourceSftpHost = sftpHostExport;
        var sourceSftpPort = sftpPortExport;
        var sourceSftpName = sftpNameExport;
        var sourceSftpPassword = sftpPasswordExport;
    }
    cy.get(source).find('select').as('source')
    cy.get('@source').select('sftp');
    cy.get(filePathSftp).find('input').as('sftpFilePath')
    cy.get('@sftpFilePath')
        .type(filePath)
        .should('have.value', filePath)
    cy.get(sourceSftpHost).find('input').as('sftpHost')
    cy.get('@sftpHost')
        .type(sftpHost)
        .should('have.value', sftpHost)
    cy.get(sourceSftpPort).find('input').as('sftpPort')
    cy.get('@sftpPort')
        .type(sftpPort)
        .should('have.value', sftpPort)
    cy.get(sourceSftpName).find('input').as('sftpUserName')
    cy.get('@sftpUserName')
        .type(sftpUserName)
        .should('have.value', sftpUserName)
    cy.get(sourceSftpPassword).find('input').as('sftpPassword')
    cy.get('@sftpPassword')
        .type(sftpPassword)
        .should('have.value', sftpPassword)
})

//Const for ftp source
//data for ftp server
const ftpHost = '***';
const ftpPort = '***';
const ftpUserName = '***';
const ftpPassword = '***';
//export
const exportSourceFtp = '.source_export_source_entity';
const exportFilePathFtp = '.export_source_ftp_file_path';
const ftpHostExport = '.export_source_ftp_host';
const ftpPortExport = '.export_source_ftp_port';
const ftpNameExport = '.export_source_ftp_user';
const ftpPasswordExport = '.export_source_ftp_password ';
//import
const importSourceFtp = '.import_source';
const importFilePathFtp = '.ftp_file_path';
const ftpHostImport = '.ftp_host';
const ftpPortImport = '.ftp_port';
const ftpNameImport = '.ftp_user';
const ftpPasswordImport = '.ftp_password';

//Choose ftp source and ftp data input
Cypress.Commands.add('ftpSource',(sourceEntityProcess,filePath) => {
    if(sourceEntityProcess == 'importFtp'){
        var source = importSourceFtp;
        var filePathSftp = importFilePathFtp;
        var sourceSftpHost = ftpHostImport;
        var sourceSftpPort = ftpPortImport;
        var sourceSftpName = ftpNameImport;
        var sourceSftpPassword = ftpPasswordImport;
    }else{
        var source = exportSourceFtp;
        var filePathSftp = exportFilePathFtp;
        var sourceSftpHost = ftpHostExport;
        var sourceSftpPort = ftpPortExport;
        var sourceSftpName = ftpNameExport;
        var sourceSftpPassword = ftpPasswordExport;
    }
    cy.get(source).find('select').as('source')
    cy.get('@source').select('ftp');
    cy.get(filePathSftp).find('input').as('ftpFilePath')
    cy.get('@ftpFilePath')
        .type(filePath)
        .should('have.value', filePath)
    cy.get(sourceSftpHost).find('input').as('ftpHost')
    cy.get('@ftpHost')
        .type(ftpHost)
        .should('have.value', ftpHost)
    cy.get(sourceSftpPort).find('input').as('ftpPort')
    cy.get('@ftpPort')
        .type(ftpPort)
        .should('have.value', ftpPort)
    cy.get(sourceSftpName).find('input').as('ftpUserName')
    cy.get('@ftpUserName')
        .type(ftpUserName)
        .should('have.value', ftpUserName)
    cy.get(sourceSftpPassword).find('input').as('ftpPassword')
    cy.get('@ftpPassword')
        .type(ftpPassword)
        .should('have.value', ftpPassword)
})

//Choose Dropbox Source
Cypress.Commands.add('dropboxSource' , (filePath) => {
    cy.get('.import_source').find('select').as('importSource')
    cy.get('@importSource').select('dropbox');
    cy.get('.dropbox_file_path ').find('input').as('dropboxFilePath')
    cy.get('@dropboxFilePath')
        .type(filePath).should('have.value', filePath)
    cy.get('.dropbox_access_token ').find('input').as('dropboxAccessToken')
    cy.get('@dropboxAccessToken')
        .type('***')
        .should('have.value', '***')
})

//Choose File Source
Cypress.Commands.add('fileSource',(filePath) => {
    cy.get('.import_source').find('select').as('importSource')
    cy.get('@importSource').select('file');
    cy.get('.file_file_path').find('input').as('filePath')
    cy.get('@filePath')
        .type(filePath)
        .should('have.value', filePath)
})

//Choose Google File Path Source
Cypress.Commands.add('googlePathSource', (filePath) => {
    cy.get('.import_source').find('select').as('importSource')
    cy.get('@importSource').select('google');
    cy.get('.google_file_path').find('input').as('googleFilePath')
    cy.get('@googleFilePath')
        .invoke('val', filePath)
        .trigger('change')
})

//Choose Url Path Source
Cypress.Commands.add('urlSource', (filePath) => {
    cy.get('.import_source').find('select').as('importSource')
    cy.get('@importSource').select('url');
    cy.get('.url_file_path ').find('input').as('urlFilePath')
    cy.get('@urlFilePath')
        .type(filePath)
        .should('have.value', filePath)
})

//check Export result
Cypress.Commands.add('consoleExportResult' , (exportEntityResult) => {
    cy.get('#debug-run',{timeout: 120000}).contains(exportEntityResult,{timeout: 120000})
    cy.get('#debug-run').contains('The export is finished.',{timeout: 120000})
    cy.get('#debug-run').contains('There is no data for the export.',{timeout: 120000}).should('not.exist')
    cy.get('#debug-run').contains('Please provide filter data.',{timeout: 120000}).should('not.exist')
    cy.get('#debug-run').contains('The header column names are already set.',{timeout: 120000}).should('not.exist')
    cy.get('#debug-run').contains('Exception').should('not.exist')
})

//check Import result
Cypress.Commands.add('consoleImportResult' , (importEntityResult) => {
    cy.get('#debug-run',{timeout: 120000}).contains(importEntityResult,{timeout: 120000})
    cy.get('#debug-run').contains('The import was successful.',{timeout: 120000})
    cy.get('#debug-run').contains('REINDEX completed',{timeout: 240000})
    cy.get('#debug-run').contains('This file is empty').should('not.exist')
    cy.get('#debug-run').contains('Data validation failed').should('not.exist')
    cy.get('#debug-run').contains('Invalid').should('not.exist')
    cy.get('#debug-run').contains('Exception').should('not.exist')
})

//check Import result wihout Re-index checking
Cypress.Commands.add('consoleImportResultWithoutReIndex' , (importEntityResult) => {
    cy.get('#debug-run',{timeout: 120000}).contains(importEntityResult,{timeout: 120000})
    cy.get('#debug-run').contains('The import was successful.',{timeout: 120000})
    cy.get('#debug-run').contains('This file is empty').should('not.exist')
    cy.get('#debug-run').contains('Data validation failed').should('not.exist')
    cy.get('#debug-run').contains('Invalid').should('not.exist')
    cy.get('#debug-run').contains('Exception').should('not.exist')
    cy.get('#debug-run').should('not.have.class', 'grid-severity-critical')
    cy.get('#debug-run').contains('Issue on create').should('not.exist')
    cy.get('#debug-run').contains('Issue on update').should('not.exist')
})

//delete all filter products 
Cypress.Commands.add('deleteAllFilterProducts' , () => {
    cy.get('.page-actions-buttons').find('#back').as('returnToProductGrid')
    cy.get('@returnToProductGrid').click({force:true})
    cy.get('table').find('.data-grid-checkbox-cell-inner',{timeout: 60000}).click({multiple:true})
    cy.get('.admin__data-grid-header-row').contains('Actions').as('actionsWithMultiple')
    cy.get('@actionsWithMultiple').click({force:true})
    cy.get('.action-menu-items').contains('Delete',{timeout: 60000})
    cy.get('.action-menu-items').contains('Delete').click({force:true})
    cy.get('.modal-footer').find('.action-accept').click({force:true})
})

//reset active filters 
Cypress.Commands.add('resetActiveFilters' , () => {
    cy.get('.admin__current-filters-actions-wrap',{timeout: 10000}).find('button').contains('Clear all',{timeout: 10000}).click({force:true})
})

//add Mapping Attributes Row
Cypress.Commands.add('addMappingRowImport', (rowNumber,systemAttribute,importAttribute) => {  
    cy.get('.source_data_map_rows').find('.addButton').as('tfoot')
    cy.get('@tfoot').click({force:true})
    cy.get(rowNumber).find('.source_data_map_source_data_system').find('select').as('sourceDataSystem')
    cy.get('@sourceDataSystem').select(systemAttribute);
    cy.get(rowNumber).find('.source_data_map_source_data_import').find('select').as('sourceDataImport')
    cy.get('@sourceDataImport').select(importAttribute);
})

//Upload file from a cypress folder
import 'cypress-file-upload';
