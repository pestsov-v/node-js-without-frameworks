const http2 = require("http2");

var client = http2.connect("http://localhost/6010");
const req = client.request({
  ":path": "/",
});

var str = "";
req.on("data", function (chunk) {
  str += chunk;
});

req.on("end", function () {
  console.log(str);
});

req.end();
