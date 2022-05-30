const server = require("./src/server");
const workers = require("./src/worker/workers");
const cli = require("./src/cli");

const app = {};
app.init = function (callback) {
  server();
  workers.init();

  setTimeout(() => {
    cli.init();
    callback;
  }, 50);
};

if (require.main === module) {
  app.init(function () {}); 
}



module.exports = app;
