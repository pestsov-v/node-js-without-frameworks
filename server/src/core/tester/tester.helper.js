const config = require("../../../config/variables.config");
const color = require("../color");
const TesterGraphic = require("./tester.graphic");

const {
  START_REPOST_MESSAGE,
  START_ERRORS_MESSAGE,
  END_ERRORS_MESSAGE,
  END_REPOST_MESSAGE,
  TOTAL_TEST_MESSAGE,
  PASS_MESSAGE,
  FAIL_MESSAGE,
} = require("./tester.constants");

class TesterHelper {
  makeGetRequest(path) {
    const requestDetails = {
      protocol: "http:",
      hostname: "localhost",
      port: config.httpPort,
      path: path,
      headers: {
        "Content-Type": "application/json",
      },
    };

    return requestDetails;
  }

  produceTestReport(limit, successes, errors) {
    TesterGraphic.emptyLine();
    TesterGraphic.headerLine(START_REPOST_MESSAGE);
    TesterGraphic.emptyLine();
    TesterGraphic.resultLine(TOTAL_TEST_MESSAGE, limit);
    TesterGraphic.resultLine(PASS_MESSAGE, successes);
    TesterGraphic.resultLine(FAIL_MESSAGE, errors.length);
    TesterGraphic.emptyLine();

    if (errors.length > 0) {
      TesterGraphic.headerLine(START_ERRORS_MESSAGE);
      TesterGraphic.emptyLine();
      errors.forEach(function (testError) {
        console.log(color.red, testError.name);
        console.log(testError.error);
        TesterGraphic.emptyLine();
      });
      TesterGraphic.headerLine(END_ERRORS_MESSAGE);
    }

    TesterGraphic.headerLine(END_REPOST_MESSAGE);
    process.exit(0);
  }
}

module.exports = new TesterHelper();
