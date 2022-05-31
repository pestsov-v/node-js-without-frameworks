const fs = require("fs");
const GUIHelper = require("./gui.helper");

class GUIService {
  interpolateTemplate(templatePath, data, callback) {
    fs.readFile(templatePath, "utf8", (err, str) => {
      if (err) return callback("No tammplate coult not found");
      const finalString = GUIHelper.interpolate(str, data);
      callback(false, finalString);
    });
  }

  getStaticFile(publicPath, callback) {
    fs.readFile(publicPath, (err, data) => {
      if (err) return callback("No file could be found");
      callback(false, data);
    });
  }
}

module.exports = new GUIService();
