const WorkerController = require("./worker.controller");

function worker() {
  console.log("\x1b[33m%s\x1b[0m", "Background workers are running");

  WorkerController.gatherAllChecks();
  WorkerController.loop();
  WorkerController.rotateLogs();
  WorkerController.logRotationLoop();
}

module.exports = worker;
