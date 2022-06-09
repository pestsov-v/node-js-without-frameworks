const http = require("http");

const TesterHelper = require("./tester.helper");

class TesterController {
  getRequest(path, callback) {
    const reqDetails = TesterHelper.makeGetRequest(path);
    const req = http.request(reqDetails, (res) => {
      callback(res);
    });
    req.end();
  }
}

module.exports = new TesterController();
