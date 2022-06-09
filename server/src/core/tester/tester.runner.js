const color = require("../color");
const TesterHelper = require("./tester.helper");

class TesterRunner {
  countTests(tests) {
    let counter = 0;
    for (const key in tests) {
      if (tests.hasOwnProperty(key)) {
        const subTests = tests[key];
        for (const testName in subTests) {
          if (subTests.hasOwnProperty(testName)) {
            counter++;
          }
        }
      }
    }

    return counter;
  }

  runTests(tests) {
    let errors = [];
    let successes = 0;
    let counter = 0;

    const limit = this.countTests(tests);
    for (const key in tests) {
      if (tests.hasOwnProperty(key)) {
        const subTests = tests[key];
        for (const testName in subTests) {
          if (subTests.hasOwnProperty(testName)) {
            (function () {
              const tmpTestName = testName;
              const testValue = subTests[testName];
              try {
                testValue(function () {
                  console.log(color.green, tmpTestName);
                  counter++;
                  successes++;
                  TesterHelper.produceTestReport(limit, successes, errors);
                });
              } catch (e) {
                errors.push({
                  name: testName,
                  error: e,
                });
                console.log(color.green, tmpTestName);
                counter++;
                TesterHelper.produceTestReport(limit, successes, errors);
              }
            })();
          }
        }
      }
    }
  }
}

module.exports = new TesterRunner();
