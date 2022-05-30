const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const lib = {};

lib.baseDir = path.join(__dirname, "/../.logs/");

lib.append = function (file, str, callback) {
  fs.open(lib.baseDir + file + ".log", "a", function (err, fileDescriptor) {
    if (!err && fileDescriptor) {
      fs.appendFile(fileDescriptor, str + "\n", function (err) {
        if (!err) {
          fs.close(fileDescriptor, function (err) {
            if (!err) {
              callback(false);
            } else {
              callback("Error closing file that was being appended");
            }
          });
        } else {
          callback("Error appending to file");
        }
      });
    } else {
      callback("Could open file for appending");
    }
  });
};

lib.list = function (includeCompressLogs, callback) {
  fs.readdir(lib.baseDir, function (err, data) {
    if (!err && data && data.length > 0) {
      const trimmedNames = [];
      data.forEach(function (fileName) {
        if (fileName.indexOf(".log") > -1) {
          trimmedNames.push(fileName.replace(".log", ""));
        }
        if (fileName.indexOf(".gz.b64") > -1 && includeCompressLogs) {
          trimmedNames.push(fileName.replace(".gz.b64", ""));
        }
      });
      callback(false, trimmedNames);
    } else {
      callback(err, data);
    }
  });
};

lib.compress = function (logId, newFileId, callback) {
  const sourceFile = logId + ".log";
  const destFile = newFileId + ".gz.b64";

  fs.readFile(lib.baseDir + sourceFile, "utf-8", function (err, inputsString) {
    if (!err && inputsString) {
      zlib.gzip(inputsString, function (err, buffer) {
        if (!err && buffer) {
          fs.open(lib.baseDir + destFile, "wx", function (err, fileDescriptor) {
            if (!err && fileDescriptor) {
              fs.writeFile(
                fileDescriptor,
                buffer.toString("base64"),
                function (err) {
                  if (!err) {
                    fs.close(fileDescriptor, function (err) {
                      if (!err) {
                        callback(false);
                      } else {
                        callback(err);
                      }
                    });
                  } else {
                    callback(err);
                  }
                }
              );
            } else {
              callback(err);
            }
          });
        } else {
          callback(err);
        }
      });
    } else {
      callback(err);
    }
  });
};

lib.decompress = function (fileId, callback) {
  const fileName = fileId + ".gs.b64";
  fs.readFile(lib.baseDir + fileName, "utf8", function (err, str) {
    if (!err && str) {
      const inputBuffer = Buffer.from(str, "base64");
      zlib.unzip(inputBuffer, function (err, outputBUffer) {
        if (!err && outputBUffer) {
          const str = outputBUffer.toString();
          callback(false, str);
        } else {
          callback(err);
        }
      });
    } else {
      callback(err);
    }
  });
};

lib.truncate = function (logId, callback) {
  fs.truncate(lib.baseDir + logId + ".log", 0, function (err) {
    if (!err) {
      callback(false);
    } else {
      callback(err);
    }
  });
};

module.exports = lib;
