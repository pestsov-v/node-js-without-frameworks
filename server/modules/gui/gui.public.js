const GUIHelper = require("./gui.helper");

class GUIPublic {
  favicon(data, callback) {
    if (data.method == "get") {
      GUIHelper.getStaticAsset("favicon.ico", function (err, data) {
        if (!err && data) {
          callback(200, data, "favicon");
        } else {
          callback(500);
        }
      });
    } else {
      callback(405);
    }
  }

  public(data, callback) {
    if (data.method == "get") {
      var trimmedAssetName = data.trimmedPath.replace("public/", "").trim();
      if (trimmedAssetName.length > 0) {
        GUIHelper.getStaticAsset(trimmedAssetName, function (err, data) {
          if (!err && data) {
            var contentType = "plain";

            if (trimmedAssetName.indexOf(".css") > -1) {
              contentType = "css";
            }

            if (trimmedAssetName.indexOf(".png") > -1) {
              contentType = "png";
            }

            if (trimmedAssetName.indexOf(".jpg") > -1) {
              contentType = "jpg";
            }

            if (trimmedAssetName.indexOf(".ico") > -1) {
              contentType = "favicon";
            }
            callback(200, data, contentType);
          } else {
            callback(404);
          }
        });
      } else {
        callback(404);
      }
    } else {
      callback(405);
    }
  }
}

module.exports = new GUIPublic();
