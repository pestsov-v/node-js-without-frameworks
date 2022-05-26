const server = require("./src/server");
const workers = require("./src/worker/workers");

const app = {};
app.init = function () {
  server();
  workers.init();
};

app.init();

module.exports = app;
