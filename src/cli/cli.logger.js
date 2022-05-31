const logger = require("../logs");
const dbHelper = require("../../core/database/db.helper");

class CLILogger {
  decompressFile(fileName) {
    logger.decompress(fileName, (err, strData) => {
      if (err) return false;
      const arr = strData.split("\n");
      arr.forEach(function (jsonString) {
        const logObject = dbHelper.parseObj(jsonString);
        if (logObject == "{}") return false;

        console.dir(logObject, { colors: true });
      });
    });
  }
}

module.exports = new CLILogger();
