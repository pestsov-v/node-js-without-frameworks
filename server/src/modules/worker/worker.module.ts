import WorkerController from "./worker.controller";

function worker() {
  console.log("\x1b[33m%s\x1b[0m", "Фоновая запись логов успешно запущена");

  WorkerController.gatherAllChecks();
  WorkerController.loop();
  WorkerController.rotateLogs();
  WorkerController.logRotationLoop();
}

export default worker
