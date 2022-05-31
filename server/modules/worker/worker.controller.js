const db = require("../../src/core/database/db.router");
const router = require("../../src/core/base/enum/route.enum");
const WorkerService = require("./worker.service");
const WorkerLogger = require("./worker.logger");
const WorkerDebugger = require("./worker.debug");

class WorkerController {
  gatherAllChecks() {
    db.list(router.checks, (err, checks) => {
      if (err) WorkerDebugger.CHECKS_NOT_FOUND();
      checks.forEach(function (check) {
        WorkerService.readChecks(check);
      });
    });
  }

  loop() {
    setInterval(() => {
      this.gatherAllChecks();
    }, 1000 * 60);
  }

  rotateLogs() {
    WorkerLogger.truncateData();
  }

  logRotationLoop() {
    this.loop = () => {
      setInterval(() => {
        this.rotateLogs();
      }, 1000 * 60 * 60 * 24);
    };
  }
}

module.exports = new WorkerController();
