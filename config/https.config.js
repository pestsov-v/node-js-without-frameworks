const fs = require("fs");
const path = require("path");

const options = {
  key: fs.readFileSync(path.join(__dirname, "/../core/https/key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "/../core/https/cert.pem")),
};

module.exports = options;
