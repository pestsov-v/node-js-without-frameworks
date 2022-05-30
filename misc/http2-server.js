const http2 = require("http2");

var server = http2.createServer();

server.on("stream", function (stream, headers) {
  stream.respond({
    status: 200,
    "content-type": "test/html",
  });
  stream.end("<html><body><p>Hello http2<p></body></html>");
});

server.listen(6010);
