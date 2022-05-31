const GUIHelper = require("./gui.helper");

class GUIController {
  index(data, callback) {
    if (data.method == "get") {
      const templateData = {
        "head.title": "Мониторинг времени безотказной работы — это просто",
        "head.description":
          "Мы предлагаем бесплатный простой мониторинг обновлений для сайтов HTTP/HTTPS всех видов. Когда ваш сайт выйдет из строя, мы отправим вам текстовое сообщение, чтобы вы знали",
        "body.class": "Index",
      };

      GUIHelper.getTemplate("index", templateData, function (err, str) {
        if (!err && str) {
          GUIHelper.addUniversalTemplates(
            str,
            templateData,
            function (err, str) {
              if (!err && str) {
                callback(200, str, "html");
              } else {
                callback(500, undefined, "html");
              }
            }
          );
        } else {
          callback(500, undefined, "html");
        }
      });
    } else {
      callback(400, undefined, "html");
    }
  }

  accountCreate(data, callback) {
    if (data.method == "get") {
      const templateData = {
        "head.title": "Создать аккаунт",
        "head.description":
          "Зарегистрируйтесь легко, ведь это займёт всего несколько секунд",
        "body.class": "accountCreate",
      };

      GUIHelper.getTemplate("accountCreate", templateData, function (err, str) {
        if (!err && str) {
          GUIHelper.addUniversalTemplates(
            str,
            templateData,
            function (err, str) {
              if (!err && str) {
                callback(200, str, "html");
              } else {
                callback(500, undefined, "html");
              }
            }
          );
        } else {
          callback(500, undefined, "html");
        }
      });
    } else {
      callback(400, undefined, "html");
    }
  }

  sessionCreate(data, callback) {
    if (data.method == "get") {
      var templateData = {
        "head.title": "Login to your account.",
        "head.description":
          "Please enter your phone number and password to access your account.",
        "body.class": "sessionCreate",
      };
      GUIHelper.getTemplate("sessionCreate", templateData, function (err, str) {
        if (!err && str) {
          GUIHelper.addUniversalTemplates(
            str,
            templateData,
            function (err, str) {
              if (!err && str) {
                callback(200, str, "html");
              } else {
                callback(500, undefined, "html");
              }
            }
          );
        } else {
          callback(500, undefined, "html");
        }
      });
    } else {
      callback(405, undefined, "html");
    }
  }

  accountEdit(data, callback) {
    if (data.method == "get") {
      var templateData = {
        "head.title": "Account Settings",
        "body.class": "accountEdit",
      };
      GUIHelper.getTemplate("accountEdit", templateData, function (err, str) {
        if (!err && str) {
          GUIHelper.addUniversalTemplates(
            str,
            templateData,
            function (err, str) {
              if (!err && str) {
                callback(200, str, "html");
              } else {
                callback(500, undefined, "html");
              }
            }
          );
        } else {
          callback(500, undefined, "html");
        }
      });
    } else {
      callback(405, undefined, "html");
    }
  }

  sessionDeleted(data, callback) {
    if (data.method == "get") {
      var templateData = {
        "head.title": "Logged Out",
        "head.description": "You have been logged out of your account.",
        "body.class": "sessionDeleted",
      };
      GUIHelper.getTemplate(
        "sessionDeleted",
        templateData,
        function (err, str) {
          if (!err && str) {
            GUIHelper.addUniversalTemplates(
              str,
              templateData,
              function (err, str) {
                if (!err && str) {
                  callback(200, str, "html");
                } else {
                  callback(500, undefined, "html");
                }
              }
            );
          } else {
            callback(500, undefined, "html");
          }
        }
      );
    } else {
      callback(405, undefined, "html");
    }
  }

  accountDeleted(data, callback) {
    if (data.method == "get") {
      var templateData = {
        "head.title": "Account Deleted",
        "head.description": "Your account has been deleted.",
        "body.class": "accountDeleted",
      };
      GUIHelper.getTemplate(
        "accountDeleted",
        templateData,
        function (err, str) {
          if (!err && str) {
            GUIHelper.addUniversalTemplates(
              str,
              templateData,
              function (err, str) {
                if (!err && str) {
                  callback(200, str, "html");
                } else {
                  callback(500, undefined, "html");
                }
              }
            );
          } else {
            callback(500, undefined, "html");
          }
        }
      );
    } else {
      callback(405, undefined, "html");
    }
  }

  checksCreate(data, callback) {
    if (data.method == "get") {
      var templateData = {
        "head.title": "Create a New Check",
        "body.class": "checksCreate",
      };
      GUIHelper.getTemplate("checksCreate", templateData, function (err, str) {
        if (!err && str) {
          GUIHelper.addUniversalTemplates(
            str,
            templateData,
            function (err, str) {
              if (!err && str) {
                callback(200, str, "html");
              } else {
                callback(500, undefined, "html");
              }
            }
          );
        } else {
          callback(500, undefined, "html");
        }
      });
    } else {
      callback(405, undefined, "html");
    }
  }

  checksList(data, callback) {
    if (data.method == "get") {
      var templateData = {
        "head.title": "Dashboard",
        "body.class": "checksList",
      };
      GUIHelper.getTemplate("checksList", templateData, function (err, str) {
        if (!err && str) {
          GUIHelper.addUniversalTemplates(
            str,
            templateData,
            function (err, str) {
              if (!err && str) {
                callback(200, str, "html");
              } else {
                callback(500, undefined, "html");
              }
            }
          );
        } else {
          callback(500, undefined, "html");
        }
      });
    } else {
      callback(405, undefined, "html");
    }
  }

  checksEdit(data, callback) {
    if (data.method == "get") {
      var templateData = {
        "head.title": "Check Details",
        "body.class": "checksEdit",
      };
      GUIHelper.getTemplate("checksEdit", templateData, function (err, str) {
        if (!err && str) {
          GUIHelper.addUniversalTemplates(
            str,
            templateData,
            function (err, str) {
              if (!err && str) {
                callback(200, str, "html");
              } else {
                callback(500, undefined, "html");
              }
            }
          );
        } else {
          callback(500, undefined, "html");
        }
      });
    } else {
      callback(405, undefined, "html");
    }
  }
}

module.exports = new GUIController();
