import db from "../../core/database/db.router";

import { errOrNull } from "../logger/type/errorOrNull.type";
import WorkerService from "./worker.service";
import WorkerLogger from "./worker.logger";
import WorkerDebugger from "./worker.debug";
import router from "../../core/base/router.enum";

export default class WorkerController {
  static gatherAllChecks() {
    db.list(router.checks, (err: errOrNull, checks: string[]) => {
      if (err) WorkerDebugger.CHECKS_NOT_FOUND();
      checks.forEach(function (check) {
        WorkerService.readChecks(check);
      });
    });
  }

  static loop() {
    setInterval(() => {
      this.gatherAllChecks();
    }, 1000 * 60);
  }

  static rotateLogs() {
    WorkerLogger.truncateData();
  }

  static logRotationLoop() {
    this.loop = () => {
      setInterval(() => {
        this.rotateLogs();
      }, 1000 * 60 * 60 * 24);
    };
  }
}