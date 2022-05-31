const GUIHelper = require("./gui.helper");
const method = require("../../core/base/enum/method.enum");
const statusCode = require("../../core/base/statusCode");
const format = require("../../core/base/format");

class GUIBase {
  renderPage(namePage, templateData) {
    return (data, callback) => {
      if (data.method != method.get) {
        return callback(statusCode.BAD_REQUEST, null, format.html);
      }

      GUIHelper.getTemplate(namePage, templateData, (err, str) => {
        if (err) return callback(statusCode.SERVER_ERROR, null, format.html);
        GUIHelper.addUniversalTemplates(str, templateData, (err, str) => {
          if (err) return callback(statusCode.SERVER_ERROR, null, format.html);
          return callback(statusCode.OK, str, format.html);
        });
      });
    };
  }
}

module.exports = new GUIBase();
