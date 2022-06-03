import { method } from "../../core/base/enum/method.enum";
import { statusCode } from "../../core/base/enum/statusCode.enum";
import { getStaticAsset } from "./gui.helper";

const content = require("../../core/base/enum/contentType");
const extension = require("../../core/base/enum/extensionType");

export default class GUIPublic {
  static favicon(data, callback) {
    if (data.method != method.get) return callback(statusCode.BAD_REQUEST);

    getStaticAsset("favicon.ico", (err, data) => {
      if (err) return callback(statusCode.SERVER_ERROR);
      return callback(statusCode.OK, data, content.favicon);
    });
  }

  static public(data, callback) {
    if (data.method != method.get) return callback(statusCode.BAD_REQUEST);
    const assetName = data.trimmedPath.replace("public/", "").trim();
    if (assetName.length < 0) return callback(statusCode.NOT_FOUND);
    getStaticAsset(assetName, (err, data) => {
      if (err) return callback(statusCode.NOT_FOUND);
      let contentType = content.plain;

      if (assetName.indexOf(extension.css) > -1) contentType = content.css;
      if (assetName.indexOf(extension.png) > -1) contentType = content.png;
      if (assetName.indexOf(extension.jpg) > -1) contentType = content.jpg;
      if (assetName.indexOf(extension.ico) > -1) contentType = content.favicon;

      callback(statusCode.OK, data, contentType);
    });
  }
}