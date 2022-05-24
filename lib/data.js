const fs = require("fs");
const path = require("path");
const helpers = require("./helpers");

const lib = {};

lib.baseDir = path.join(__dirname, "../.data/");



lib.create = function (dir, file, data, callback) {
  fs.open(
    `${lib.baseDir}${dir}/${file}.json`,
    "wx",
    function (err, fileDescriptior) {
      if (!err && fileDescriptior) {
        const stringData = JSON.stringify(data);

        fs.writeFile(fileDescriptior, stringData, function (err) {
          if (!err) {
            fs.close(fileDescriptior, function (err) {
              if (!err) {
                callback(false);
              } else {
                callback("Ошибка закрытия файла");
              }
            });
          } else {
            callback("Ошибка записи нового файла");
          }
        });
      } else {
        callback("Не удалось создать новый файл, возможно, он уже существует");
      }
    }
  );
};

lib.read = function (dir, file, callback) {
  fs.readFile(
    `${lib.baseDir}${dir}/${file}.json`,
    "utf-8",
    function (err, data) {
      if (!err && data) {
        const parsedData = helpers.parceJsonToObject(data);
        callback(false, parsedData);
      } else {
        callback(err, data);
      }
    }
  );
};

lib.update = function (dir, file, data, callback) {
  fs.open(
    `${lib.baseDir}${dir}/${file}.json`,
    "r+",
    function (err, fileDescriptior) {
      if (!err && fileDescriptior) {
        const stringData = JSON.stringify(data);

        fs.ftruncate(fileDescriptior, function (err) {
          if (!err) {
            fs.writeFile(fileDescriptior, stringData, function (err) {
              if (!err) {
                fs.close(fileDescriptior, function (err) {
                  if (!err) {
                    callback(false);
                  } else {
                    callback("Возникла ошибка при закрытии файла");
                  }
                });
              } else {
                callback("Возникла ошибка при записи в существующий файл");
              }
            });
          } else {
            callback("Произошла ошибка при стирании файла");
          }
        });
      } else {
        callback(
          "Не удалось открыть файл для обновления, возможно, он не существует"
        );
      }
    }
  );
};

lib.delete = function (dir, file, callback) {
  fs.unlink(`${lib.baseDir}${dir}/${file}.json`, function (err) {
    if (!err) {
      callback(false);
    } else {
      callback("Не удалось удалить файл, возможно он уже был удалён");
    }
  });
};

lib.list = function (dir, callback) {
  fs.readdir(`${lib.baseDir}${dir}/`, function (err, data) {
    if (!err && data && data.length > 0) {
      let trimmedFileNames = [];
      data.forEach(function (filename) {
        trimmedFileNames.push(filename.replace(".json", ""));
      });
      callback(false, trimmedFileNames);
    } else {
      callback(err, data);
    }
  });
};

module.exports = lib;
