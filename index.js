const server = require("./src/server");
const workers = require("./src/workers");

const app = {};
app.init = function () {
  server.init();
  // workers.init();
};

app.init();

module.exports = app;
