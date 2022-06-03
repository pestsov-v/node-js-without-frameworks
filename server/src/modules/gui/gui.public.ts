import content from "../../core/base/contentType";
import extention from "../../core/base/extensionType";
import method from "../../core/base/method.enum";
import statusCode from "../../core/base/statusCode.enum";
import { getStaticAsset } from "./gui.helper";


export default class GUIPublic {
  static favicon(data, callback) {
    if (data.method != method.get) return callback(statusCode.BAD_REQUEST);

    getStaticAsset("favicon.ico", (err, data) => {
      if (err) return callback(statusCode.SERVER_ERROR);
      return callback(statusCode.OK, data, contentType.favicon);
    });
  }

  static public(data, callback) {
    if (data.method != method.get) return callback(statusCode.BAD_REQUEST);
    const assetName = data.trimmedPath.replace("public/", "").trim();
    if (assetName.length < 0) return callback(statusCode.NOT_FOUND);
    getStaticAsset(assetName, (err, data) => {
      if (err) return callback(statusCode.NOT_FOUND);
      let contentType = content.plain;

      if (assetName.indexOf(extention.css) > -1) contentType = content.css;
      if (assetName.indexOf(extention.png) > -1) contentType = content.png;
      if (assetName.indexOf(extention.jpg) > -1) contentType = content.jpg;
      if (assetName.indexOf(extention.ico) > -1) contentType = content.favicon;

      callback(statusCode.OK, data, contentType);
    });
  }
}