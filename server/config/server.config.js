const config = require("./variables.config");
const StringDecoder = require("string_decoder").StringDecoder;
const url = require("url");
const router = require("../src/router");
const page404 = require("../src/modules/api/404/404.router");
const parceJsonToObject = require("../src/utils/JsonToObject");
const processResponse = require("../src/utils/processResponse");
const util = require("util");
const debug = util.debuglog("server");
const GUIModule = require("../src/modules/gui/gui.module");
const colors = require("../src/core/base/color");

class ServerConfig {
  httpPort = config.httpPort;
  httpsPort = config.httpsPort;

  unified(req, res) {
    const parseUrl = url.parse(req.url, true);
    const path = parseUrl.pathname;
    const queryStringObject = JSON.parse(JSON.stringify(parseUrl.query));
    const trimmedPath = path.replace(/^\/+|\/+$/g, "");
    const method = req.method.toLowerCase();
    const headers = JSON.parse(JSON.stringify(req.headers));
    const decoder = new StringDecoder("utf-8");
    let buffer = "";

    req.on("data", function (data) {
      buffer += decoder.write(data);
    });

    req.on("end", function () {
      buffer += decoder.end();

      let chosenHandler =
        typeof router[trimmedPath] !== "undefined"
          ? router[trimmedPath]
          : page404;

      chosenHandler =
        trimmedPath.indexOf("public/") > -1 ? GUIModule.public : chosenHandler;

      let data = {
        trimmedPath: trimmedPath,
        queryStringObject: queryStringObject,
        method: method,
        headers: headers,
        payload: parceJsonToObject(buffer),
      };

      try {
        chosenHandler(data, (statusCode, payload, contentType) => {
          processResponse(
            res,
            method,
            trimmedPath,
            statusCode,
            payload,
            contentType
          );
        });
      } catch (e) {
        console.log(e);
        debug(e);
        processResponse(
          res,
          method,
          trimmedPath,
          500,
          {
            Error: "?????????????????????? ????????????",
          },
          "json"
        );
      }
    });
  }

  httpHandler() {
    return console.log(
      colors.turquoise,
      `???????????? ???????????????? ???? ??????????: http://localhost:${config.httpPort} ?? ${config.envName} ????????`
    );
  }

  httpsHandler() {
    return console.log(
      colors.purple,
      `???????????? ???????????????? ???? ??????????: https://localhost:${config.httpsPort} ?? ${config.envName} ????????`
    );
  }
}

module.exports = new ServerConfig();
