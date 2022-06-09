const app = require("../../../../../index");
const statusCode = require("../../../../core/base/statusCode");

const assert = require("assert");
const TesterController = require("../../../../core/tester/tester.controller");

const user = {};

user["app. should start without throwing"] = (done) => {
  assert.doesNotThrow(() => {
    app((err) => {
      done();
    });
  }, TypeError);
};

user["/api/users should respond to GET with 400"] = (done) => {
  TesterController.getRequest("/api/users", function (res) {
    assert.equal(res.statusCode, statusCode.BAD_REQUEST);
    done();
  });
};

user["A random path should respond to GET with 404"] = (done) => {
  TesterController.getRequest("/this/path/shouldnt/exist", function (res) {
    assert.equal(res.statusCode, statusCode.NOT_FOUND);
    done();
  });
};

module.exports = user;
