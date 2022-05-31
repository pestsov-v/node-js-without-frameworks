const server = require("./src/server");
const workers = require("./src/worker/workers");
const cli = require("./src/cli");
const cluster = require("cluster");
const os = require("os");

const app = {};
app.init = function (callback) {
  if (cluster.isMaster) {
    workers.init();
    setTimeout(() => {
      cli.init();
      callback;
    }, 50);

    for (let i = 0; i < os.cpus().length; i++) {
      cluster.fork();
    }
  } else {
    server();
  }
};

app.init();
