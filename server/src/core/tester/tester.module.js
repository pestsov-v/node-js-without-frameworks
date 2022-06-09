process.env.NODE_ENV = "testing";
const tests = require("./tester.files");
const TesterRunner = require("./tester.runner");

TesterRunner.runTests(tests);
