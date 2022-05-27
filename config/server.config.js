const config = require("./variables.config");
const StringDecoder = require("string_decoder").StringDecoder;
const url = require("url");
const router = require("../src/router");
const page404 = require("../src/api/404/404.router");
const parceJsonToObject = require("../src/utils/JsonToObject");
const util = require("util");
const handlers = require("../src/handlers");
const debug = util.debuglog("server");

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
        trimmedPath.indexOf("public/") > -1 ? handlers.public : chosenHandler;

      let data = {
        trimmedPath: trimmedPath,
        queryStringObject: queryStringObject,
        method: method,
        headers: headers,
        payload: parceJsonToObject(buffer),
      };

      chosenHandler(data, function (statusCode, payload, contentType) {
        contentType = typeof contentType == "string" ? contentType : "json";
        statusCode = typeof statusCode == "number" ? statusCode : 200;
        let payloadString = "";

        if (contentType == "json") {
          res.setHeader("Content-Type", "application/json");
          payload = typeof payload == "object" ? payload : {};
          payloadString = JSON.stringify(payload);
        }

        if (contentType == "html") {
          res.setHeader("Content-Type", "text/html");
          payloadString = typeof payload == "string" ? payload : "";
        }

        if (contentType == "favicon") {
          res.setHeader("Content-Type", "image/x-icon");
          payloadString = typeof payload !== "undefined" ? payload : "";
        }

        if (contentType == "css") {
          res.setHeader("Content-Type", "text/css");
          payloadString = typeof payload !== "undefined" ? payload : "";
        }

        if (contentType == "png") {
          res.setHeader("Content-Type", "image/png");
          payloadString = typeof payload !== "undefined" ? payload : "";
        }

        if (contentType == "jpg") {
          res.setHeader("Content-Type", "image/jpeg");
          payloadString = typeof payload !== "undefined" ? payload : "";
        }

        if (contentType == "plain") {
          res.setHeader("Content-Type", "text/plain");
          payloadString = typeof payload !== "undefined" ? payload : "";
        }

        res.writeHead(statusCode);
        res.end(payloadString);

        if (statusCode == 200) {
          debug(
            "\x1b[32m%s\x1b[0m",
            method.toUpperCase() + " /" + trimmedPath + " " + statusCode
          );
        } else {
          debug(
            "\x1b[31m%s\x1b[0m",
            method.toUpperCase() + " /" + trimmedPath + " " + statusCode
          );
        }
      });
    });
  }

  httpHandler() {
    return console.log(
      "\x1b[36m%s\x1b[0m",
      `Сервер работает на порту: http://localhost:${config.httpPort} в ${config.envName} моде`
    );
  }

  httpsHandler() {
    return console.log(
      "\x1b[35m%s\x1b[0m",
      `Сервер работает на порту: https://localhost:${config.httpsPort} в ${config.envName} моде`
    );
  }
}

module.exports = new ServerConfig();
