const colors = require("../../core/base/color");
const WorkerController = require("./worker.controller");

function worker() {
  console.log(colors.yellow, "Фоновая запись логов успешно запущена");

  WorkerController.gatherAllChecks();
  WorkerController.loop();
  WorkerController.rotateLogs();
  WorkerController.logRotationLoop();
}

module.exports = worker;
