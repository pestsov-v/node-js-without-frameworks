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
  const headers = JSON.stringify(req.headers);

  // get payload
  const decoder = new StringDecoder("utf-8");
  let buffer = "";

  req.on("data", function (data) {
    buffer += decoder.write(data);
  });

  req.on("end", function () {
    buffer += decoder.end();

    // Choose the handler this request should go to.
    let chosenHandler =
      typeof router[trimmedPath] !== "undefined"
        ? router[trimmedPath]
        : handlers.notFound;

    // construct the data object to send to the ahndler
    let data = {
      trimmedPath: trimmedPath,
      method: method,
      headers: headers,
      payload: buffer,
    };

    // Route the request to the handler specified in the route
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
});

server.listen(config.PORT, config.listeningServerHandler);

// Define the handlers
const handlers = {};

// Sample handler
handlers.sample = function (data, callback) {
  // Callback a http satus code and payload object
  callback(406, { name: "sample handler" });
};

// Not Found handler
handlers.notFound = function (data, callback) {
  callback(404);
};

const router = {
  sample: handlers.sample,
};
