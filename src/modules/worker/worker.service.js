const workersValidateMiddleware = require("./workers.middleware");
const db = require("../../../core/database/db.router");
const WorkerHelper = require("./worker.helper");
const WorkerDebugger = require("./worker.debug");
const router = require("../../../core/base/enum/route.enum");

class WorkerService {
  readChecks(check) {
    db.read(router.checks, check, function (err, originalCheckData) {
      if (err) WorkerDebugger.ERROR_READING_CHECKS(err);
      workersValidateMiddleware(originalCheckData);
    });
  }
}

exports.updateCheck = function (newCheckData, alert) {
  db.update(router.checks, newCheckData.id, newCheckData, (err) => {
    if (err) WorkerDebugger.SAVE_UPDATE_CHECKS_ERROR();
    if (!alert) WorkerDebugger.NO_ALERT_NEEDED();
    WorkerHelper.sendSms(newCheckData);
  });
};

module.exports = new WorkerService();
