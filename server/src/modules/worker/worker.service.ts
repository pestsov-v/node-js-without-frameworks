const workersValidateMiddleware = require("./workers.middleware");
const db = require("../../core/database/db.router");
import WorkerHelper from "./worker.helper";
import { router } from "../../core/base/enum/router.enum";
import { errOrNull } from "../logger/type/errorOrNull.type";
import { IOriginalCheckData } from "./dto/originalCheckData.dto";
import WorkerDebugger from "./worker.debug";

export default class WorkerService {
  static readChecks(check: string) {
    db.read(router.checks, check, function (err: errOrNull, originalCheckData: IOriginalCheckData): void {
      if (err) WorkerDebugger.ERROR_READING_CHECKS(err);
      workersValidateMiddleware(originalCheckData);
    });
  }

    static updateCheck (newCheckData: IOriginalCheckData, alert: boolean): void {
    db.update(router.checks, newCheckData.id, newCheckData, (err: errOrNull) => {
      if (err) WorkerDebugger.SAVE_UPDATE_CHECKS_ERROR();
      if (!alert) WorkerDebugger.NO_ALERT_NEEDED();
      WorkerHelper.sendSms(newCheckData);
    });
  };
}