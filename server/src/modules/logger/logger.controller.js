const path = require("path");
const LoggerService = require("./logger.service");

const baseDir = path.join(__dirname, "/../../../data/logs/");

class LoggerController {
  append(file, str, callback) {
    const filePath = `${baseDir}${file}.log`;
    LoggerService.appendFile(filePath, str, callback);
  }

  list(includeCompressedLogs, callback) {
    LoggerService.listFiles(baseDir, includeCompressedLogs, callback);
  }

  compress(logId, newFileId, callback) {
    const sourceFile = `${baseDir}${logId}.log`;
    const destFile = `${baseDir}${newFileId}.gz.b64`;
    LoggerService.compressFile(sourceFile, destFile, callback);
  }

  decompress(fileId, callback) {
    const fileName = `${fileId}.gz.b64`;
    const filePath = `${baseDir}${fileName}`;
    LoggerService.decompressFile(filePath, callback);
  }

  truncate(logId, callback) {
    const logName = `${baseDir}${logId}.log`;
    LoggerService.truncateFile(logName, callback);
  }
}

module.exports = new LoggerController();
