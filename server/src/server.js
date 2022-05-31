const http = require("http");
const https = require("https");
const ServerConfig = require("../config/server.config");
const options = require("../config/https.config");

const httpServer = http.createServer((req, res) => {
  ServerConfig.unified(req, res);
});

const httpsServer = https.createServer(options, function (req, res) {
  ServerConfig.unified(req, res);
});

function server() {
  httpServer.listen(ServerConfig.httpPort, ServerConfig.httpHandler);
  httpsServer.listen(ServerConfig.httpsPort, ServerConfig.httpsHandler);
}

module.exports = server;
