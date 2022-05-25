const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
const config = require("../config");
const handlers = require("./handlers");
const helpers = require("./helpers");
const UserModule = require("./user/user.module");
const TokenModule = require("./token/token.module");
const CheckModule = require("./check/check.module");

const server = {};

server.httpServer = http.createServer(function (req, res) {
  server.unifiedServer(req, res);
});

server.httpsServerOptions = {
  key: fs.readFileSync(path.join(__dirname, "/../https/key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "/../https/cert.pem")),
};

server.httpsServer = https.createServer(
  server.httpsServerOptions,
  function (req, res) {
    server.unifiedServer(req, res);
  }
);

server.unifiedServer = function (req, res) {
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
      typeof server.router[trimmedPath] !== "undefined"
        ? server.router[trimmedPath]
        : handlers.notFound;

    let data = {
      trimmedPath: trimmedPath,
      queryStringObject: queryStringObject,
      method: method,
      headers: headers,
      payload: helpers.parceJsonToObject(buffer),
    };

    chosenHandler(data, function (statusCode, payload) {
      statusCode = typeof statusCode == "number" ? statusCode : 200;
      payload = typeof payload == "object" ? payload : {};

      const payloadString = JSON.stringify(payload);

      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(payloadString);

      console.log(`Ответ от сервера: `, statusCode, payloadString);
    });
  });
};

server.router = {
  users: UserModule,
  tokens: TokenModule,
  checks: CheckModule,
};

server.init = function () {
  server.httpServer.listen(config.httpPort, () => {
    console.log(
      `Сервер работает на порту: ${config.httpPort} в ${config.envName} моде`
    );
  });

  server.httpsServer.listen(config.httpsPort, () => {
    console.log(
      `Сервер работает на порту: ${config.httpsPort} в ${config.envName} моде`
    );
  });
};

module.exports = server;
