import { cli } from "./src/modules/cli/cli.module";
import server from "./src/server";
import worker from './src/modules/worker/worker.module'

import cluster from "cluster";
import os from "os";

function app (callback) {
  if (cluster.isMaster) {
    worker();
    setTimeout(() => {
      cli();
      callback;
    }, 50);

    for (let i = 0; i < os.cpus().length; i++) {
      cluster.fork();
    }
  } else {
    server();
  }
};

app(function() {});
