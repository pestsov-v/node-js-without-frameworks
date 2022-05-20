const http = require("http");
const url = require("url");
const config = require("./config");

const server = http.createServer(function (req, res) {
  const parseUrl = url.parse(req.url, true);
  const path = parseUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");
  
  console.log("Request received on path: " + trimmedPath);

  res.end("hi");
});

server.listen(config.PORT, config.listeningServerHandler);
