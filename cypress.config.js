const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "rk589i",
  e2e: {
    baseUrl: 'https://automationexercise.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
