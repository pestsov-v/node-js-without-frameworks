process.env.NODE_ENV = "testing";

_app = {};

_app.tests = {};

_app.tests.unit = require("./unit");
_app.tests.api = require("./api");

_app.countTests = function () {
  var counter = 0;
  for (var key in _app.tests) {
    if (_app.tests.hasOwnProperty(key)) {
      var subTests = _app.tests[key];
      for (var testName in subTests) {
        if (subTests.hasOwnProperty(testName)) {
          counter++;
        }
      }
    }
  }

  return counter;
};

_app.runTests = function () {
  var errors = [];
  var successes = 0;
  var limit = _app.countTests();
  var counter = 0;
  for (var key in _app.tests) {
    if (_app.tests.hasOwnProperty(key)) {
      var subTests = _app.tests[key];
      for (var testName in subTests) {
        if (subTests.hasOwnProperty(testName)) {
          (function () {
            var tmpTestName = testName;
            var testValue = subTests[testName];
            try {
              testValue(function () {
                console.log("\x1b[32m%s\x1b[0m", tmpTestName);
                counter++;
                successes++;
                if (counter == limit) {
                  _app.produceTestReport(limit, successes, errors);
                }
              });
            } catch (e) {
              errors.push({
                name: testName,
                error: e,
              });
              console.log("\x1b[31m%s\x1b[0m", tmpTestName);
              counter++;
              if (counter == limit) {
                _app.produceTestReport(limit, successes, errors);
              }
            }
          })();
        }
      }
    }
  }
};

_app.produceTestReport = function (limit, successes, errors) {
  console.log("");
  console.log("--------------------BEGIN TEST REPORT--------------------");
  console.log("");
  console.log("Total Test: ", limit);
  console.log("Pass: ", successes);
  console.log("Fail: ", errors.length);
  console.log("");

  if (errors.length > 0) {
    console.log("--------------------BEGIN ERROR DETAILS--------------------");
    console.log("");
    errors.forEach(function (testError) {
      console.log("\x1b[31m%s\x1b[0m", testError.name);
      console.log(testError.error);
      console.log("");
    });
    console.log("--------------------END ERROR DETAILS--------------------");
  }

  console.log("");
  console.log("--------------------END TEST REPORT--------------------");
  process.exit(0);
};

_app.runTests();
