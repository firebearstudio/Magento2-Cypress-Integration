# Magento2-Cypress-Integration

This is set of Cypress tests for <a href="https://firebearstudio.com/the-improved-import.html">FireBear Studio Improved Import & Export extension for Magento 2</a>. The core issue of run Cypress tests on Magento 2 backend is that id of each HTML element always unique and generated based on user session, for Cypress tests every element should have permanent static id - this what we did with our addon - add unique element id's and other required things to make Magento 2 admin testing of our extension possible with Cypress. Based on that addon you can add id's to any element on M2 backend and get your Cypress tests running! 

**Installing Cypress via node.js package manager**

#**1.Dependencies**

**1.1 Install node.js package manager**

**Run command:** `sudo apt install npm`

**1.2 Install node.js** 

**Run command:** 
`sudo apt install nodejs-legacy`

**1.3 Install next packages**

**Run command:**
`sudo apt-get install xvfb libgtk2.0-0 libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2`


#**2. Init node.js project**

**2.1 Run command:** `npm init`

**2.2 Specify project parameters**


#**3.Installing Cypress**

**3.1 Change directory:** `cd /your/project/path`

**3.2 Run command:** `sudo npm install cypress --save-dev`

#**4.Writing Test**

**4.1 Open the cypress app**

**4.2 Change directory:** `cd /your/project/path`

**4.3 Run command:** `node_modules/.bin/cypress open.`

This command will create sample js files to /your/project/path/cypress folder and open the Cypress Test Runner

**4.5 Create and run a custom test**

Create a custom js file in /your/project/path/cypress/integration folder

**Run command:** `node_modules/.bin/cypress run.`

As a default test results were stored in `/your/project/path/cypress/screenshots` and `/your/project/path/cypress/videos `folder.
