const server = require("./server/src/server");
const worker = require("./server/modules/worker/worker.module");
const cli = require("./server/modules/cli/cli.module");

function app(callback) {
  server();
  worker();

  setTimeout(() => {
    cli();
    callback;
  }, 50);
}

if (require.main === module) {
  app(function () {});
}

module.exports = app;
