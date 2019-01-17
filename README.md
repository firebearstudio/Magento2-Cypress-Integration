# Magento2-Cypress-Integration

This is set of <a href="https://www.cypress.io/">Cypress</a> tests for <a href="https://firebearstudio.com/the-improved-import.html">FireBear Studio Improved Import & Export extension for Magento 2</a>. The core issue of run Cypress tests on Magento 2 backend is that id of each HTML element always unique and generated based on user session, for Cypress tests every element should have permanent static id - this what we did with our addon - add unique element id's and other required things to make Magento 2 admin testing of our extension possible with Cypress. Based on that addon you can add id's to any element on M2 backend and get your Cypress tests running! This extension can be used as good base to make any area and part of M2 testable. 

<a href="https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell">Cypress user guide</a>
