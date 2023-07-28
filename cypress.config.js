const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: "cypress/integration/api-tests/*.spec.cy.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  integration: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
