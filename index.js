const http = require("http");

const server = http.createServer(function (req, res) {
  res.end("hi");
});

server.listen(3010, function () {
  console.log(`The server is listening on port 3000 now`);
});
