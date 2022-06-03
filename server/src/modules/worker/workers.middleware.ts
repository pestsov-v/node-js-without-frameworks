import { IOriginalCheckData } from "./dto/originalCheckData.dto";
import { ICheckOutcomeDto } from "./dto/checkOutcome.dto";

import WorkerValidator from "./worker.validator";
import WorkerHelper from "./worker.helper";
import WorkerLogger from "./worker.logger";
import WorkerDebugger from "./worker.debug";
import WorkerService from "./worker.service";
import { IParseUrl } from "./response/parseUrl.response";
 
function workersValidateMiddleware(originalCheckData: IOriginalCheckData) {
  const { id, userPhone, protocol, url, method } = originalCheckData;
  originalCheckData = WorkerValidator.objValidate(originalCheckData);
  originalCheckData.id = WorkerValidator.idValidate(id);
  originalCheckData.userPhone = WorkerValidator.phoneValidate(userPhone);
  originalCheckData.protocol = WorkerValidator.protocolValidate(protocol);
  originalCheckData.url = WorkerValidator.urlValidate(url);
  originalCheckData.method = WorkerValidator.methodValidate(method);

  const { code, time, state, lastChecked } = originalCheckData;
  originalCheckData.code = WorkerValidator.сodeValidate(code);
  originalCheckData.time = WorkerValidator.timeValidate(time);
  originalCheckData.state = WorkerValidator.stateValidate(state);
  originalCheckData.lastChecked = WorkerValidator.lastValidate(lastChecked);

  if (!id || !userPhone || !protocol || !url || !method || !code || !time) {
    WorkerDebugger.NOT_PROPERTY_FORMATTED;
  }

  performCheck(originalCheckData);
}

function performCheck(originalCheckData: IOriginalCheckData) {
  const checkOutcome = {
    error: false,
    responseCode: false,
  };

  let outcomeSent: boolean = false;

  const { protocol, url } = originalCheckData;
  const parcedUrl: IParseUrl = WorkerHelper.parceUrl(protocol, url);
  const requestDetails = WorkerHelper.getDetails(originalCheckData, parcedUrl);

  const useModule = WorkerValidator.useModuleValidate(protocol);

  const req = useModule.request(requestDetails, (res) => {
    const status = res.statusCode;
    checkOutcome.responseCode = status;

    if (!outcomeSent) {
      processCheckOutcome(originalCheckData, checkOutcome);
      outcomeSent = true;
    }
  });

  req.on("error", function (e) {
    checkOutcome.error = { error: true, value: e };
    if (!outcomeSent) {
      processCheckOutcome(originalCheckData, checkOutcome);
      outcomeSent = true;
    }
  });

  req.on("timeout", function () {
    checkOutcome.error = { error: true, value: "timeout" };
    if (!outcomeSent) {
      processCheckOutcome(originalCheckData, checkOutcome);
      outcomeSent = true;
    }
  });

  req.end();
}

function processCheckOutcome(originalCheckData: IOriginalCheckData, checkOutcome: ICheckOutcomeDto) {
  const { code } = originalCheckData;
  const state: string = WorkerValidator.outcomeStateValidate(checkOutcome, code);
  const alert: string = WorkerValidator.alertValidate(originalCheckData, state);
  const timeOfCheck = Date.now();

  const processOutcome = { state, alert, timeOfCheck };

  WorkerLogger.loggedData(originalCheckData, checkOutcome, processOutcome);

  const newCheckData = originalCheckData;
  newCheckData.state = state;
  newCheckData.lastChecked = Date.now();

  WorkerService.updateCheck(newCheckData, alert);
}

module.exports = workersValidateMiddleware;
