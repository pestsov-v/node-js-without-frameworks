const logger = require("../logger/logger.module");
const WorkerHelper = require("./worker.helper");
const WorkerDebugger = require("./worker.debug");

class WorkerLogger {
  loggedData(originalCheckData, checkOutcome, processOutcome) {
    const logData = WorkerHelper.getLogObject(
      originalCheckData,
      checkOutcome,
      processOutcome
    );

    const logFileName = originalCheckData.id;

    logger.append(logFileName, logData, (err) => {
      if (err) WorkerDebugger.LOGGING_FAIL();
      WorkerDebugger.LOGGING_SUCCESS();
    });
  }

  truncateData() {
    logger.list(false, (err, logs) => {
      if (err) WorkerDebugger.NOT_FOUND_LOGS();
      logs.forEach(function (logName) {
        const logId = logName.replace(".log", "");
        const newFileld = logId + "-" + Date.now();
        logger.compress(logId, newFileld, (err) => {
          if (err) WorkerDebugger.NOT_COMPRESSED_FILE(err);
          logger.truncate(logId, (err) => {
            if (err) WorkerDebugger.TRUNCATING_FILE_ERROR();
            WorkerDebugger.TRUNCATING_FILE_SUCCESS();
          });
        });
      });
    });
  }
}

module.exports = new WorkerLogger();
