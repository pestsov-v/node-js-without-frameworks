const path = require("path");
const fs = require("fs");
const config = require("../config/variables.config");

const helpers = {};

helpers.getTemplate = function (templateName, data, callback) {
  templateName =
    typeof templateName == "string" && templateName.length > 0
      ? templateName
      : false;

  data = typeof data == "object" && data !== null ? data : {};

  if (templateName) {
    const templatesDir = path.join(__dirname, "/../templates/");
    fs.readFile(
      templatesDir + templateName + ".html",
      "utf8",
      function (err, str) {
        if (!err && str && str.length > 0) {
          const finalString = helpers.interpolate(str, data);
          callback(false, finalString);
        } else {
          callback("No tammplate coult not found");
        }
      }
    );
  } else {
    callback("A valid templateName was not specified");
  }
};

helpers.addUniversalTemplates = function (str, data, callback) {
  str = typeof str == "string" && str.length > 0 ? str : "";
  data = typeof data == "object" && data !== null ? data : {};

  helpers.getTemplate("_header", data, function (err, headerString) {
    if (!err && headerString) {
      helpers.getTemplate("_footer", data, function (err, footerString) {
        if (!err && footerString) {
          const fullString = headerString + str + footerString;
          callback(false, fullString);
        } else {
          callback("Could not find the footer template");
        }
      });
    } else {
      callback("Could-not find the header template");
    }
  });
};

helpers.interpolate = function (str, data) {
  str = typeof str == "string" && str.length > 0 ? str : "";
  data = typeof data == "object" && data !== null ? data : {};

  for (const keyName in config.templateGlobals) {
    if (config.templateGlobals.hasOwnProperty(keyName)) {
      data["global." + keyName] = config.templateGlobals[keyName];
    }
  }

  for (const key in data) {
    if (data.hasOwnProperty(key) && typeof data[key] == "string") {
      const replace = data[key];
      const find = "{" + key + "}";
      str = str.replace(find, replace);
    }
  }

  return str;
};

module.exports = helpers;
