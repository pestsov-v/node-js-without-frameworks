const path = require("path");
const fs = require("fs");

const helpers = {};

helpers.getTemplate = function (templateName, callback) {
  templateName =
    typeof templateName == "string" && templateName.length > 0
      ? templateName
      : false;

  if (templateName) {
    const templatesDir = path.join(__dirname, "/../templates/");
    fs.readFile(
      templatesDir + templateName + ".html",
      "utf8",
      function (err, str) {
        if (!err && str && str.length > 0) {
          callback(false, str);
        } else {
          callback("No tammplate coult not found");
        }
      }
    );
  } else {
    callback("A valid templateName was not specified");
  }
};

module.exports = helpers;
