const fs = require("fs");
const path = require("path");

const options = {
  key: fs.readFileSync(path.join(__dirname, "/../src/core/https/key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "/../src/core/https/cert.pem")),
};

module.exports = options;
