const assert = require("assert");
const LoggerModule = require("../../../logger/logger.module");

const unit = {};

unit["logs.list should callback a false error and an array of log names"] =
  function (done) {
    LoggerModule.list(true, function (err, logFileNames) {
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
    LoggerModule.truncate("I do not exist", function (err) {
      assert.ok(err);
      done();
    });
  }, TypeError);
};

module.exports = unit;
