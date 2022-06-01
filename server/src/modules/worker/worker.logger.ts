import LoggerModule from "../logger/logger.module";
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

    LoggerModule.append(logFileName, logData, (err) => {
      if (err) WorkerDebugger.LOGGING_FAIL();
      WorkerDebugger.LOGGING_SUCCESS();
    });
  }

  truncateData() {
    LoggerModule.list(false, (err, logs) => {
      if (err) WorkerDebugger.NOT_FOUND_LOGS();
      logs.forEach(function (logName) {
        const logId = logName.replace(".log", "");
        const newFileld = logId + "-" + Date.now();
        LoggerModule.compress(logId, newFileld, (err) => {
          if (err) WorkerDebugger.NOT_COMPRESSED_FILE(err);
          LoggerModule.truncate(logId, (err) => {
            if (err) WorkerDebugger.TRUNCATING_FILE_ERROR();
            WorkerDebugger.TRUNCATING_FILE_SUCCESS();
          });
        });
      });
    });
  }
}

module.exports = new WorkerLogger();
