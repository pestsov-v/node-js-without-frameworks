const fs = require("fs");
const path = require("path");
const DatabaseHelper = require("./db.helper");
const { FILE_ERROR_WRITED_TO_EXSISTS_FILE_MESSAGE } = require("./db.constants");
const {
  FILE_HAS_BEEN_EXISTS,
  FILE_ERROR_WRITED,
  FILE_ERROR_CLOSED,
  FILE_ERROR_UPDATE,
  FILE_ERROR_DELETE,
  FILE_ERROR_DELETE_EXISTS_FILE,
} = require("./db.exception");

const baseDir = path.join(__dirname, "../../../../.data/");

class DatabaseController {
  dbCreate(dir, file, data, callback) {
    const filePath = `${baseDir}${dir}/${file}.json`;

    fs.open(filePath, "wx", function (err, fileDescriptior) {
      if (err) return callback(FILE_HAS_BEEN_EXISTS);
      const stringData = JSON.stringify(data);

      fs.writeFile(fileDescriptior, stringData, function (err) {
        if (err) callback(FILE_ERROR_WRITED);

        fs.close(fileDescriptior, function (err) {
          if (err) return callback(FILE_ERROR_CLOSED);
          return callback(false);
        });
      });
    });
  }

  dbRead(dir, file, callback) {
    const filePath = `${baseDir}${dir}/${file}.json`;

    fs.readFile(filePath, "utf-8", function (err, data) {
      if (err) return callback(err, data);
      const parsedData = DatabaseHelper.parseObj(data);
      callback(false, parsedData);
    });
  }

  dbUpdate(dir, file, data, callback) {
    const filePath = `${baseDir}${dir}/${file}.json`;

    fs.open(filePath, "r+", function (err, fileDescriptior) {
      if (err) return callback(FILE_ERROR_UPDATE);
      const stringData = JSON.stringify(data);

      fs.ftruncate(fileDescriptior, function (err) {
        if (err) return callback(FILE_ERROR_DELETE);

        fs.writeFile(fileDescriptior, stringData, function (err) {
          if (err) return callback(FILE_ERROR_WRITED_TO_EXSISTS_FILE_MESSAGE);

          fs.close(fileDescriptior, function (err) {
            if (err) return callback(FILE_ERROR_CLOSED);
            return callback(false);
          });
        });
      });
    });
  }

  dbDelete(dir, file, callback) {
    const filePath = `${baseDir}${dir}/${file}.json`;

    fs.unlink(filePath, function (err) {
      if (err) return callback(FILE_ERROR_DELETE_EXISTS_FILE);
      return callback(false);
    });
  }

  dbList(dir, callback) {
    fs.readdir(`${baseDir}${dir}/`, function (err, data) {
      console.log(baseDir);
      if (err) callback(err, data);

      let trimmedFileNames = [];
      data.forEach(function (filename) {
        trimmedFileNames.push(filename.replace(".json", ""));
      });
      callback(false, trimmedFileNames);
    });
  }
}

module.exports = new DatabaseController();
