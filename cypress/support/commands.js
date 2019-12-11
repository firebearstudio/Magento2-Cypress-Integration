//const for enter to Admin panel
const urlToMagentoLocal = '***'; //admin url
const usernameForLocal = '***'; //admin username
const passwordForLocal = '***'; //admin password
const urlToMagentoCE = 'http://import.com/admin'; //admin url
const usernameForCE = 'admin'; //admin username
const passwordForCE = 'magento2'; //admin password
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

//General section for import
Cypress.Commands.add('generalImportSection' , jobName  => {
    cy.get('.general_is_active',{timeout: 60000}).find('.admin__actions-switch-label').as('generalIsActive')
    cy.get('@generalIsActive').click()
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
Cypress.Commands.add('dropboxSource' , (filePath , dropboxAccessToken) => {
    cy.get('.import_source').find('select').as('importSource')
    cy.get('@importSource').select('dropbox');
    cy.get('.dropbox_file_path ').find('input').as('dropboxFilePath')
    cy.get('@dropboxFilePath')
        .type(filePath).should('have.value', filePath)
    cy.get('.dropbox_access_token ').find('input').as('dropboxAccessToken')
    cy.get('@dropboxAccessToken')
        .type(dropboxAccessToken)
        .should('have.value', dropboxAccessToken)
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
    cy.get('#debug-run').contains(exportEntityResult,{timeout: 60000})
    cy.get('#debug-run').contains('The export is finished.',{timeout: 60000})
    cy.get('#debug-run').contains('There is no data for the export.',{timeout: 60000}).should('not.exist')
    cy.get('#debug-run').contains('Please provide filter data.',{timeout: 60000}).should('not.exist')
    cy.get('#debug-run').contains('The header column names are already set.',{timeout: 60000}).should('not.exist')
    cy.get('#debug-run').contains('Exception').should('not.exist')
})

//check Import result
Cypress.Commands.add('consoleImportResult' , (importEntityResult) => {
    cy.get('#debug-run').contains(importEntityResult,{timeout: 60000})
    cy.get('#debug-run').contains('The import was successful.',{timeout: 600000})
    cy.get('#debug-run').contains('REINDEX completed',{timeout: 600000})
    cy.get('#debug-run').contains('This file is empty').should('not.exist')
    cy.get('#debug-run').contains('Data validation failed').should('not.exist')
    cy.get('#debug-run').contains('Invalid').should('not.exist')
    cy.get('#debug-run').contains('Exception').should('not.exist')
})
    