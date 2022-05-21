const http = require("http");
const https = require("https");
const fs = require("fs");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
const config = require("./config");
const _data = require("./lib/data");

_data.delete("test", "newFile", function (err) {
  console.log("this was the error", err);
});

const httpServer = http.createServer(function (req, res) {
  unifiedServer(req, res);
});

httpServer.listen(config.httpPort, () => {
  console.log(
    `Сервер работает на порту: ${config.httpPort} в ${config.envName} моде`
  );
});

const httpsServerOptions = {
  key: fs.readFileSync("./https/key.pem"),
  cert: fs.readFileSync("./https/cert.pem"),
};

const httpsServer = https.createServer(httpsServerOptions, function (req, res) {
  unifiedServer(req, res);
});

httpsServer.listen(config.httpsPort, () => {
  console.log(
    `Сервер работает на порту: ${config.httpsPort} в ${config.envName} моде`
  );
});

const unifiedServer = function (req, res) {
  const parseUrl = url.parse(req.url, true);
  const path = parseUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");
  const method = req.method.toUpperCase();
  const headers = JSON.stringify(req.headers);
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
        : handlers.notFound;

    let data = {
      trimmedPath: trimmedPath,
      method: method,
      headers: headers,
      payload: buffer,
    };

    chosenHandler(data, function (statusCode, payload) {
      statusCode = typeof statusCode == "number" ? statusCode : 200;
      payload = typeof payload == "object" ? payload : {};

      const payloadString = JSON.stringify(payload);

      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(payloadString);

      console.log(`Returning this response: `, statusCode, payloadString);
    });
  });
};

const handlers = {};

handlers.ping = function (data, callback) {
  callback(200);
};

const router = {
  ping: handlers.ping,
};
