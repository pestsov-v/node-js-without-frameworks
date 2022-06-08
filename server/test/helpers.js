var helpers = {};

const http = require("http");
const config = require("../config/variables.config");

helpers.makeGetRequest = function (path, callback) {
  var requestDetails = {
    protocol: "http:",
    hostname: "localhost",
    port: config.httpPort,
    path: path,
    headers: {
      "Content-Type": "application/json",
    },
  };

  var req = http.request(requestDetails, function (res) {
    callback(res);
  });
  req.end();
};

module.exports = helpers;
