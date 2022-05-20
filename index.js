const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
const config = require("./config");

const server = http.createServer(function (req, res) {
  // get route path
  const parseUrl = url.parse(req.url, true);
  const path = parseUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");

  //get http methods
  const method = req.method.toUpperCase();

  // get headers
  const headers = req.rawHeaders;

  // get payload
  const decoder = new StringDecoder("utf-8");
  let buffer = "";

  req.on("data", function (data) {
    buffer += decoder.write(data);
  });

  req.on("end", function () {
    buffer += decoder.end();

    // log results
    console.log(
      "Запрос был отправлен по машруту: " +
        trimmedPath +
        " с методом: " +
        method +
        " с загаловками: " +
        buffer
    );

    res.end();
  });
});

server.listen(config.PORT, config.listeningServerHandler);
