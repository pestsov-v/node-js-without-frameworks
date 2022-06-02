import LoggerModule from "../logger/logger.module";
import WorkerHelper from "./worker.helper";
import WorkerDebugger from "./worker.debug";
import { IOriginalCheckData } from "./dto/originalCheckData.dto";
import { ICheckOutcomeDto } from "./dto/checkOutcome.dto";
import { IProcessOutcome } from "./dto/processOutcome.dto";

export default class WorkerLogger {
  static loggedData(originalCheckData: IOriginalCheckData, checkOutcome: ICheckOutcomeDto, processOutcome: IProcessOutcome) {
    const logData: string = WorkerHelper.getLogObject(
      originalCheckData,
      checkOutcome,
      processOutcome
    );

    const logFileName: string = originalCheckData.id;

    LoggerModule.append(logFileName, logData, (err) => {
      if (err) WorkerDebugger.LOGGING_FAIL();
      WorkerDebugger.LOGGING_SUCCESS();
    });
  }

  static truncateData() {
    LoggerModule.list(false, (err, logs) => {
      if (err) WorkerDebugger.NOT_FOUND_LOGS();
      logs.forEach((logName: string )  =>{
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