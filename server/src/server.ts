import http from "http";
import https from "https";
import ServerConfig from "../config/server.config";
import {options} from "../config/https.config";

const httpServer = http.createServer((req, res) => {
  ServerConfig.unified(req, res);
});

const httpsServer = https.createServer(options, function (req, res) {
  ServerConfig.unified(req, res);
});

export default function server() {
  httpServer.listen(ServerConfig.httpPort, ServerConfig.httpHandler);
  httpsServer.listen(ServerConfig.httpsPort, ServerConfig.httpsHandler);
}