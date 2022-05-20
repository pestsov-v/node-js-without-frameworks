const http = require("http");
const url = require("url");
const config = require("./config");

const server = http.createServer(function (req, res) {
  const parseUrl = url.parse(req.url, true);
  const path = parseUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");
  const method = req.method.toUpperCase();

  console.log(
    "Запрос был отправлен по машруту: " + trimmedPath + " с методом: " + method
  );

  res.end();
});

server.listen(config.PORT, config.listeningServerHandler);
