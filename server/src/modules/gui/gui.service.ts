import fs from "fs";
import { interpolate } from "./gui.helper";

export default class GUIService {
  static interpolateTemplate(templatePath, data, callback) {
    fs.readFile(templatePath, "utf8", (err, str) => {
      if (err) return callback("No tammplate coult not found");
      const finalString = interpolate(str, data);
      callback(false, finalString);
    });
  }

  static getStaticFile(publicPath, callback) {
    fs.readFile(publicPath, (err, data) => {
      if (err) return callback("No file could be found");
      callback(false, data);
    });
  }
}
