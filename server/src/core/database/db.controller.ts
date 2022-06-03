import fs from "fs";
import path from "path";
import DatabaseHelper from "./db.helper";

import { FILE_ERROR_WRITED_TO_EXSISTS_FILE_MESSAGE } from "./db.constants";
import {
  FILE_HAS_BEEN_EXISTS, FILE_ERROR_WRITED, 
  FILE_ERROR_CLOSED, 
  FILE_ERROR_UPDATE, 
  FILE_ERROR_DELETE, 
  FILE_ERROR_DELETE_EXISTS_FILE 
} from "./db.exception";

const baseDir = path.join(__dirname, "../../../../server/data/");

export default class DatabaseController {
  static dbCreate(dir: string, file: string, data, callback) {
    const filePath: string = `${baseDir}${dir}/${file}.json`;

    fs.open(filePath, "wx", function (err, fileDescriptior) {
      if (err) return callback(FILE_HAS_BEEN_EXISTS);
      const stringData: string = JSON.stringify(data);

      fs.writeFile(fileDescriptior, stringData, function (err) {
        if (err) callback(FILE_ERROR_WRITED);

        fs.close(fileDescriptior, function (err) {
          if (err) return callback(FILE_ERROR_CLOSED);
          return callback(false);
        });
      });
    });
  }

  static dbRead(dir: string, file: string, callback) {
    const filePath: string = `${baseDir}${dir}/${file}.json`;

    fs.readFile(filePath, "utf-8", function (err, data) {
      if (err) return callback(err, data);
      const parsedData = DatabaseHelper.parseObj(data);
      callback(false, parsedData);
    });
  }

  static dbUpdate(dir: string, file: string, data, callback) {
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

  static dbDelete(dir: string, file: string, callback) {
    const filePath: string = `${baseDir}${dir}/${file}.json`;

    fs.unlink(filePath, function (err) {
      if (err) return callback(FILE_ERROR_DELETE_EXISTS_FILE);
      return callback(false);
    });
  }

  static dbList(dir: string, callback) {
    fs.readdir(`${baseDir}${dir}/`, function (err, data) {
      if (err) callback(err, data);

      let trimmedFileNames: string[] = [];
      data.forEach(function (filename) {
        trimmedFileNames.push(filename.replace(".json", ""));
      });
      callback(false, trimmedFileNames);
    });
  }
}