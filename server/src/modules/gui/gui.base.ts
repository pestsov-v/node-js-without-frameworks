import format from "../../core/base/enum/format.enum";
import { method } from "../../core/base/enum/method.enum";
import { statusCode } from "../../core/base/enum/statusCode.enum";

const GUIHelper = require("./gui.helper");

export default class GUIBase {
  static renderPage(namePage, templateData) {
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