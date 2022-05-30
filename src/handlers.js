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


handlers.exampleError = function(data, callback) {
  var err = new Error('This is example error')
  throw(err)
}

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
    var templateData = {
      "head.title": "Login to your account.",
      "head.description":
        "Please enter your phone number and password to access your account.",
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
    callback(405, undefined, "html");
  }
};

handlers.accountEdit = function (data, callback) {
  if (data.method == "get") {
    var templateData = {
      "head.title": "Account Settings",
      "body.class": "accountEdit",
    };
    helpers.getTemplate("accountEdit", templateData, function (err, str) {
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
    callback(405, undefined, "html");
  }
};

handlers.sessionDeleted = function (data, callback) {
  if (data.method == "get") {
    var templateData = {
      "head.title": "Logged Out",
      "head.description": "You have been logged out of your account.",
      "body.class": "sessionDeleted",
    };
    helpers.getTemplate("sessionDeleted", templateData, function (err, str) {
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
    callback(405, undefined, "html");
  }
};

handlers.accountDeleted = function (data, callback) {
  if (data.method == "get") {
    var templateData = {
      "head.title": "Account Deleted",
      "head.description": "Your account has been deleted.",
      "body.class": "accountDeleted",
    };
    helpers.getTemplate("accountDeleted", templateData, function (err, str) {
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
    callback(405, undefined, "html");
  }
};

handlers.checksCreate = function (data, callback) {
  if (data.method == "get") {
    var templateData = {
      "head.title": "Create a New Check",
      "body.class": "checksCreate",
    };
    helpers.getTemplate("checksCreate", templateData, function (err, str) {
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
    callback(405, undefined, "html");
  }
};

handlers.checksList = function (data, callback) {
  if (data.method == "get") {
    var templateData = {
      "head.title": "Dashboard",
      "body.class": "checksList",
    };
    helpers.getTemplate("checksList", templateData, function (err, str) {
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
    callback(405, undefined, "html");
  }
};

handlers.checksEdit = function (data, callback) {
  if (data.method == "get") {
    var templateData = {
      "head.title": "Check Details",
      "body.class": "checksEdit",
    };
    helpers.getTemplate("checksEdit", templateData, function (err, str) {
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
    callback(405, undefined, "html");
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
