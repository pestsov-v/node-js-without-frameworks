var app = require("../index");
const assert = require("assert");
const http = require("http");
const config = require("../config/variables.config");

var api = {};
var helpers = {};

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

api["app.init should start without throwing"] = function (done) {
  assert.doesNotThrow(function () {
    app.init(function (err) {
      done();
    });
  }, TypeError);
};

api["/api/users should respond to GET with 400"] = function (done) {
  helpers.makeGetRequest("/api/users", function (res) {
    assert.equal(res.statusCode, 400);
    done();
  });
};

api["A random path should respond to GET with 404"] = function (done) {
  helpers.makeGetRequest("/this/path/shouldnt/exist", function (res) {
    assert.equal(res.statusCode, 404);
    done();
  });
};

module.exports = api;
