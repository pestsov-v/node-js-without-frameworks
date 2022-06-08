const app = require("../");
const assert = require("assert");
const TesterController = require("../src/core/tester/tester.controller");
var api = {};

api["app.init should start without throwing"] = function (done) {
  assert.doesNotThrow(function () {
    app(function (err) {
      done();
    });
  }, TypeError);
};

api["/api/users should respond to GET with 400"] = function (done) {
  TesterController.getRequest("/api/users", function (res) {
    assert.equal(res.statusCode, 400);
    done();
  });
};

api["A random path should respond to GET with 404"] = function (done) {
  TesterController.getRequest("/this/path/shouldnt/exist", function (res) {
    assert.equal(res.statusCode, 404);
    done();
  });
};

module.exports = api;
