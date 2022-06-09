const tests = require("./tester.files");

class TesterRunner {
  countTests() {
    var counter = 0;
    for (var key in tests) {
      if (tests.hasOwnProperty(key)) {
        var subTests = tests[key];
        for (var testName in subTests) {
          if (subTests.hasOwnProperty(testName)) {
            counter++;
          }
        }
      }
    }

    return counter;
  }

  runTests() {
    var errors = [];
    var successes = 0;
    var limit = this.countTests();
    var counter = 0;
    for (var key in tests) {
      if (tests.hasOwnProperty(key)) {
        var subTests = tests[key];
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
                    this.produceTestReport(limit, successes, errors);
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
                  this.produceTestReport(limit, successes, errors);
                }
              }
            })();
          }
        }
      }
    }
  }

  produceTestReport(limit, successes, errors) {
    console.log("");
    console.log("--------------------BEGIN TEST REPORT--------------------");
    console.log("");
    console.log("Total Test: ", limit);
    console.log("Pass: ", successes);
    console.log("Fail: ", errors.length);
    console.log("");

    if (errors.length > 0) {
      console.log(
        "--------------------BEGIN ERROR DETAILS--------------------"
      );
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
  }
}

module.exports = new TesterRunner();
