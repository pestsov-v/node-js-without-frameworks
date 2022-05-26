const config = require("./variables.config");
const StringDecoder = require("string_decoder").StringDecoder;
const url = require("url");
const router = require("../src/router");
const page404 = require("../src/modules/404/404.router");
const parceJsonToObject = require("../src/utils/JsonToObject");
const util = require("util");
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

      let data = {
        trimmedPath: trimmedPath,
        queryStringObject: queryStringObject,
        method: method,
        headers: headers,
        payload: parceJsonToObject(buffer),
      };

      chosenHandler(data, function (statusCode, payload) {
        statusCode = typeof statusCode == "number" ? statusCode : 200;
        payload = typeof payload == "object" ? payload : {};

        const payloadString = JSON.stringify(payload);

        res.setHeader("Content-Type", "application/json");
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
        debug(`Ответ от Сервера: `, statusCode, payloadString);
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
