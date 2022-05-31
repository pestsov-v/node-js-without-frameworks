const util = require("util");
const colors = require("../core/base/color");
const debug = util.debuglog("server");

function processResponse(
  res,
  method,
  trimmedPath,
  statusCode,
  payload,
  contentType
) {
  contentType = typeof contentType == "string" ? contentType : "json";
  statusCode = typeof statusCode == "number" ? statusCode : 200;
  let payloadString = "";

  if (contentType == "json") {
    res.setHeader("Content-Type", "application/json");
    payload = typeof payload == "object" ? payload : {};
    payloadString = JSON.stringify(payload);
  }

  if (contentType == "html") {
    res.setHeader("Content-Type", "text/html");
    payloadString = typeof payload == "string" ? payload : "";
  }

  if (contentType == "favicon") {
    res.setHeader("Content-Type", "image/x-icon");
    payloadString = typeof payload !== "undefined" ? payload : "";
  }

  if (contentType == "css") {
    res.setHeader("Content-Type", "text/css");
    payloadString = typeof payload !== "undefined" ? payload : "";
  }

  if (contentType == "png") {
    res.setHeader("Content-Type", "image/png");
    payloadString = typeof payload !== "undefined" ? payload : "";
  }

  if (contentType == "jpg") {
    res.setHeader("Content-Type", "image/jpeg");
    payloadString = typeof payload !== "undefined" ? payload : "";
  }

  if (contentType == "plain") {
    res.setHeader("Content-Type", "text/plain");
    payloadString = typeof payload !== "undefined" ? payload : "";
  }

  res.writeHead(statusCode);
  res.end(payloadString);

  if (statusCode == 200) {
    debug(
      colors.green,
      method.toUpperCase() + " /" + trimmedPath + " " + statusCode
    );
  } else {
    debug(
      colors.orange,
      method.toUpperCase() + " /" + trimmedPath + " " + statusCode
    );
  }
}

module.exports = processResponse;
