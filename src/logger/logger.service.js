const fs = require("fs");
const zlib = require("zlib");

const {
  APEND_NOT_FOUND,
  APPEND_ERROR_FILE,
  APPEND_ERROR_CLOSED,
} = require("./logger.constants");

class LoggerService {
  appendFile(filePath, str, callback) {
    fs.open(filePath, "a", (err, fileDescriptor) => {
      if (err) return callback(APEND_NOT_FOUND);

      fs.appendFile(fileDescriptor, str + "\n", (err) => {
        if (err) return callback(APPEND_ERROR_FILE);

        fs.close(fileDescriptor, (err) => {
          if (err) return callback(APPEND_ERROR_CLOSED);
          return callback(false);
        });
      });
    });
  }

  listFiles(baseDir, includeCompressedLogs, callback) {
    fs.readdir(baseDir, (err, data) => {
      if (err) return callback(err, data);
      const trimmedFileNames = [];
      data.forEach((fileName) => {
        if (fileName.indexOf(".log") > -1) {
          trimmedFileNames.push(fileName.replace(".log", ""));
        }
        if (fileName.indexOf(".gz.b64") > -1 && includeCompressedLogs) {
          trimmedFileNames.push(fileName.replace(".gz.b64", ""));
        }
      });
      callback(false, trimmedFileNames);
    });
  }

  compressFile(sourceFile, destFile, callback) {
    fs.readFile(sourceFile, "utf-8", (err, inputsString) => {
      if (err) return callback(err);

      zlib.gzip(inputsString, (err, buffer) => {
        if (err) return callback(err);

        fs.open(destFile, "wx", (err, fileDescriptor) => {
          if (err) return callback(err);

          fs.writeFile(fileDescriptor, buffer.toString("base64"), (err) => {
            if (err) return callback(err);

            fs.close(fileDescriptor, (err) => {
              if (err) return callback(err);
              return callback(false);
            });
          });
        });
      });
    });
  }

  decompressFile(filePath, callback) {
    fs.readFile(filePath, "utf8", (err, str) => {
      if (err) return callback(err);
      const inputBuffer = Buffer.from(str, "base64");

      zlib.unzip(inputBuffer, (err, outputBuffer) => {
        if (err) return callback(err);
        const str = outputBuffer.toString();
        return callback(false, str);
      });
    });
  }

  truncateFile(logName, callback) {
    fs.truncate(logName, 0, (err) => {
      if (err) return callback(err);
      return callback(false);
    });
  }
}

module.exports = new LoggerService();
