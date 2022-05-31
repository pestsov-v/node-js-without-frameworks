const content = require("../../core/base/enum/contentType");
const extension = require("../../core/base/enum/extensionType");
const method = require("../../core/base/enum/method.enum");
const statusCode = require("../../core/base/statusCode");

const GUIHelper = require("./gui.helper");

class GUIPublic {
  favicon(data, callback) {
    if (data.method != method.get) return callback(statusCode.BAD_REQUEST);

    GUIHelper.getStaticAsset("favicon.ico", (err, data) => {
      if (err) return callback(statusCode.SERVER_ERROR);
      return callback(statusCode.OK, data, content.favicon);
    });
  }

  public(data, callback) {
    if (data.method != method.get) return callback(statusCode.BAD_REQUEST);
    const assetName = data.trimmedPath.replace("public/", "").trim();
    if (assetName.length < 0) return callback(statusCode.NOT_FOUND);
    GUIHelper.getStaticAsset(assetName, (err, data) => {
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

module.exports = new GUIPublic();
