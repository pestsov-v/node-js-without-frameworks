const logger = require("../logger/logger.module");
const dbHelper = require("../../core/database/db.helper");

export default class CLILogger {
  static decompressFile(fileName: string): void {
    logger.decompress(fileName, (err: Error, strData: string) => {
      if (err) return false;
      const arr = strData.split("\n");
      arr.forEach((str: string) => {
        const logObject = dbHelper.parseObj(str);
        if (logObject == "{}") return false;

        console.dir(logObject, { colors: true });
      });
    });
  }
}
