const helpers = require("../src/helpers");
const assert = require("assert");
const logs = require("../modules/logger/logger.module");

var unit = {};

unit["helpers.getNumber should return a number"] = function (done) {
  var val = helpers.getNumber();
  assert.equal(typeof val, "number");
  done();
};

unit["helpers.getNumber should return 1"] = function (done) {
  var val = helpers.getNumber();
  assert.equal(val, 1);
  done();
};

unit["logs.list should callback a false error and an array of log names"] =
  function (done) {
    logs.list(true, function (err, logFileNames) {
      assert.equal(err, false);
      assert.ok(logFileNames instanceof Array);
      assert.ok(logFileNames.length > 1);
      done();
    });
  };

unit[
  "logs.truncate should not throw if the logId does not exist, should callback an error instead"
] = function (done) {
  assert.doesNotThrow(function () {
    logs.truncate("I do not exist", function (err) {
      assert.ok(err);
      done();
    });
  }, TypeError);
};

module.exports = unit;
