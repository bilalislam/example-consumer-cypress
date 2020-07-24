/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

// cypress/plugins/index.js

const pact = require("@pact-foundation/pact");
let server;

module.exports = (on, config) => {
  on("task", {
    createFakeServer(options) {
      server = new pact.Pact(options);
      return server.setup();
    },
    stopFakeServer() {
      server.finalize();
      return null;
    },
    addInteraction(options) {
      return server.addInteraction(options);
    },
    verifyPacts() {
      return server.verify();
    },
  });

  return on, config;
};