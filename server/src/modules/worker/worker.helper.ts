import * as url from 'url'

import { errOrNull } from "../logger/type/errorOrNull.type";
import { ICheckOutcomeDto } from "./dto/checkOutcome.dto";
import { ILogDataDto } from "./dto/logData.dto";
import { IOriginalCheckData } from "./dto/originalCheckData.dto";
import { IProcessOutcome } from "./dto/processOutcome.dto";
import { IParseUrl } from "./response/parseUrl.response";
import WorkerDebugger from "./worker.debug";
const sendSms = require("../../utils/sendSms");
const { alertMessage } = require("./worker.constants");

export default class WorkerHelper {

  static parceUrl(protocol: string | false, str: string): IParseUrl {
    const parsedUrl = url.parse(protocol + "://" + str, true);
    return parsedUrl; 
  }

  static getDetails(originalCheckData: IOriginalCheckData, parcedUrl: IParseUrl) {
    const hostName = parcedUrl.hostname;
    const path = parcedUrl.pathname;

    const { protocol, method, time } = originalCheckData;

    return {
      protocol: protocol + ":",
      hostname: hostName,
      method: method.toUpperCase(),
      path: path,
      timeout: time * 1000,
    };
  }

  static getLogObject(originalCheckData: IOriginalCheckData, checkOutcome: ICheckOutcomeDto, processOutcome: IProcessOutcome) {
    const { state, alert, timeOfCheck } = processOutcome;

    const logData: ILogDataDto = {
      check: originalCheckData,
      outcome: checkOutcome,
      state: state,
      alert: alert,
      timeOfCheck: timeOfCheck,
    };

    return JSON.stringify(logData);
  }

  static sendSms(newCheckData: IOriginalCheckData) {
    const { method, protocol, url, state } = newCheckData;
    const msg: string = alertMessage(method, protocol, url, state);

    sendSms(newCheckData.userPhone, msg, (err: errOrNull) => {
      if (err) WorkerDebugger.ERROR_SEND_SMS(err);
      WorkerDebugger.SUCCESS_SEND_SMS(msg);
    });
  }
}
