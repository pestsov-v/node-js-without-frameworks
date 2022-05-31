const path = require("path");
const pages = require("./gui.pages");
const config = require("../../config/variables.config");
const GUIValidator = require("./gui.validator");
const GUIService = require("./gui.service");

const {
  FOOTER_NOT_FOUND,
  HEADER_NOT_FOUND,
  TEMPLATE_NOT_FOUND,
  PUBLIC_NOT_FOUND,
} = require("./gui.constants");

exports.getTemplate = function (templateName, data, callback) {
  templateName = GUIValidator.nameValidate(templateName);
  data = GUIValidator.dataValidate(data);

  if (!templateName) return callback(TEMPLATE_NOT_FOUND);
  const templatesDir = path.join(__dirname, "/./templates/");
  const templatePath = `${templatesDir}${templateName}.html`;

  GUIService.interpolateTemplate(templatePath, data, callback);
};

exports.addUniversalTemplates = function (str, data, callback) {
  str = GUIValidator.strValidate(str);
  data = GUIValidator.dataValidate(data);

  this.getTemplate(pages.header, data, (err, headerString) => {
    if (err) return callback(HEADER_NOT_FOUND);

    this.getTemplate(pages.footer, data, (err, footerString) => {
      if (err) return callback(FOOTER_NOT_FOUND);

      const fullString = `${headerString}${str}${footerString}`;
      callback(false, fullString);
    });
  });
};

exports.interpolate = function (str, data) {
  str = GUIValidator.strValidate(str);
  data = GUIValidator.dataValidate(data);

  for (const keyName in config.templateGlobals) {
    if (config.templateGlobals.hasOwnProperty(keyName)) {
      data["global." + keyName] = config.templateGlobals[keyName];
    }
  }

  for (const key in data) {
    if (data.hasOwnProperty(key) && typeof (data[key] == "string")) {
      const replace = data[key];
      const find = `{${key}}`;
      str = str.replace(find, replace);
    }
  }
  return str;
};

exports.getStaticAsset = function (fileName, callback) {
  fileName = GUIValidator.fileNameValidate(fileName);
  if (!fileName) return callback(PUBLIC_NOT_FOUND);

  const publicDir = path.join(__dirname, "/../../public/");
  const publicPath = `${publicDir}${fileName}`;

  GUIService.getStaticFile(publicPath, callback);
};
