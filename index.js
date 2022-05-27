const server = require("./src/server");
const workers = require("./src/worker/workers");
const cli = require("./src/cli");

const app = {};
app.init = function () {
  server();
  workers.init();

  setTimeout(() => {
    cli.init();
  }, 50);
};

app.init();

module.exports = app;
