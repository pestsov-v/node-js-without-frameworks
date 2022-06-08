const config = require("../../../config/variables.config");

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
}

module.exports = new TesterHelper();
