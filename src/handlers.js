const _data = require("../core/database/db.router");
const config = require("../config/variables.config");
const helpers = require("./helpers");

let handlers = {};

handlers.index = function (data, callback) {
  if (data.method == "get") {
    const templateData = {
      "head.title": "Мониторинг времени безотказной работы — это просто",
      "head.description":
        "Мы предлагаем бесплатный простой мониторинг обновлений для сайтов HTTP/HTTPS всех видов. Когда ваш сайт выйдет из строя, мы отправим вам текстовое сообщение, чтобы вы знали",
      "body.class": "Index",
    };

    helpers.getTemplate("index", templateData, function (err, str) {
      if (!err && str) {
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(400, undefined, "html");
  }
};

handlers.accountCreate = function (data, callback) {
  if (data.method == "get") {
    const templateData = {
      "head.title": "Создать аккаунт",
      "head.description":
        "Зарегистрируйтесь легко, ведь это займёт всего несколько секунд",
      "body.class": "accountCreate",
    };

    helpers.getTemplate("accountCreate", templateData, function (err, str) {
      if (!err && str) {
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(400, undefined, "html");
  }
};

handlers.sessionCreate = function (data, callback) {
  if (data.method == "get") {
    const templateData = {
      "head.title": "Войти в профиль",
      "head.description":
        "Введите Ваш номер телефона и пароль, чтобы зайти в профиль",
      "body.class": "sessionCreate",
    };

    helpers.getTemplate("sessionCreate", templateData, function (err, str) {
      if (!err && str) {
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(400, undefined, "html");
  }
};

handlers.favicon = function (data, callback) {
  if (data.method == "get") {
    helpers.getStaticAsset("favicon.ico", function (err, data) {
      if (!err && data) {
        callback(200, data, "favicon");
      } else {
        callback(500);
      }
    });
  } else {
    callback(405);
  }
};

handlers.public = function (data, callback) {
  if (data.method == "get") {
    var trimmedAssetName = data.trimmedPath.replace("public/", "").trim();
    if (trimmedAssetName.length > 0) {
      helpers.getStaticAsset(trimmedAssetName, function (err, data) {
        if (!err && data) {
          var contentType = "plain";

          if (trimmedAssetName.indexOf(".css") > -1) {
            contentType = "css";
          }

          if (trimmedAssetName.indexOf(".png") > -1) {
            contentType = "png";
          }

          if (trimmedAssetName.indexOf(".jpg") > -1) {
            contentType = "jpg";
          }

          if (trimmedAssetName.indexOf(".ico") > -1) {
            contentType = "favicon";
          }
          callback(200, data, contentType);
        } else {
          callback(404);
        }
      });
    } else {
      callback(404);
    }
  } else {
    callback(405);
  }
};

module.exports = handlers;
