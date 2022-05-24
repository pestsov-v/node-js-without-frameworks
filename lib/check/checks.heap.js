const _data = require("../core/database/db.router");
const helpers = require("./helpers");
const config = require("../config");

const handlers = {};

handlers.checks = function (data, callback) {
  const acceptableMethods = ["post", "get", "put", "delete"];
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._checks[data.method](data, callback);
  } else {
    callback(405);
  }
};

handlers._checks = {};

handlers._checks.post = function (data, callback) {
  const protocol =
    typeof data.payload.url == "string" &&
    ["https", "http"].indexOf(data.payload.protocol) > -1
      ? data.payload.protocol
      : false;

  const url =
    typeof data.payload.url == "string" && data.payload.url.trim().length > 0
      ? data.payload.url
      : false;

  const method =
    typeof data.payload.method == "string" &&
    ["post", "get", "update", "delete"].indexOf(data.payload.method) > -1
      ? data.payload.method
      : false;

  const successCodes =
    typeof data.payload.successCodes == "object" &&
    data.payload.successCodes instanceof Array &&
    data.payload.successCodes.length > 0
      ? data.payload.successCodes
      : false;

  const timeoutSeconds =
    typeof data.payload.timeoutSeconds == "number" &&
    data.payload.timeoutSeconds % 1 === 0 &&
    data.payload.timeoutSeconds >= 1 &&
    data.payload.timeoutSeconds <= 5
      ? data.payload.timeoutSeconds
      : false;

  if (protocol && url && method && successCodes && timeoutSeconds) {
    const token =
      typeof data.headers.token === "string" ? data.headers.token : false;

    _data.read("tokens", token, function (err, tokenData) {
      if (!err && tokenData) {
        const userPhone = tokenData.phone;

        _data.read("users", userPhone, function (err, userData) {
          if (!err && userData) {
            const userChecks =
              typeof userData.checks == "object" &&
              userData.checks instanceof Array
                ? userData.checks
                : [];

            if (userChecks.length < config.maxChecks) {
              const checkId = helpers.createRandomString(20);
              const checkObject = {
                id: checkId,
                userPhone: userPhone,
                protocol: protocol,
                url: url,
                method: method,
                successCodes: successCodes,
                timeoutSeconds: timeoutSeconds,
              };

              _data.create("checks", checkId, checkObject, function (err) {
                if (!err) {
                  userData.checks = userChecks;
                  userData.checks.push(checkId);

                  _data.update("users", userPhone, userData, function (err) {
                    if (!err) {
                      callback(200, checkObject);
                    } else {
                      callback(500, {
                        Error: "Произошла ошибка при обновлении проверки",
                      });
                    }
                  });
                } else {
                  callback(500, {
                    Error: "Произошла ошибка при создании проверки",
                  });
                }
              });
            } else {
              callback(400, {
                Error:
                  "Пользователь превысил максимальное количество запросов. Максимальное количество запросов - 5",
              });
            }
          } else {
            callback(403, { Error: "Пользователь не авторизован" });
          }
        });
      } else {
        callback(403, { Error: "Пользователь не авторизован" });
      }
    });
  } else {
    callback(400, {
      Error: "Пропущено одно или несколько из обязательных полей",
    });
  }
};

handlers._checks.get = function (data, callback) {
  const id =
    typeof data.queryStringObject.id == "string" &&
    data.queryStringObject.id.trim().length == 20
      ? data.queryStringObject.id.trim()
      : false;

  if (id) {
    _data.read("checks", id, function (err, checkData) {
      if (!err && checkData) {
        const token =
          typeof data.headers.token == "string" ? data.headers.token : false;

        handlers._tokens.verifyToken(
          token,
          checkData.userPhone,
          function (tokenIsValid) {
            if (tokenIsValid) {
              callback(200, checkData);
            } else {
              callback(403, {
                Error:
                  "Вы не авторизованы. Чтобы получить данные пользователя необходимо сперва авторизироваться",
              });
            }
          }
        );
      } else {
        callback(404, { Error: `id ${id} Не был найден` });
      }
    });
  } else {
    callback(400, { Error: "Указан не верный формат номера телефона" });
  }
};

handlers._checks.put = function (data, callback) {
  const id =
    typeof data.payload.id == "string" && data.payload.id.trim().length == 20
      ? data.payload.id.trim()
      : false;

  const protocol =
    typeof data.payload.url == "string" &&
    ["https", "http"].indexOf(data.payload.protocol) > -1
      ? data.payload.protocol
      : false;

  const url =
    typeof data.payload.url == "string" && data.payload.url.trim().length > 0
      ? data.payload.url
      : false;

  const method =
    typeof data.payload.method == "string" &&
    ["post", "get", "update", "delete"].indexOf(data.payload.method) > -1
      ? data.payload.method
      : false;

  const successCodes =
    typeof data.payload.successCodes == "object" &&
    data.payload.successCodes instanceof Array &&
    data.payload.successCodes.length > 0
      ? data.payload.successCodes
      : false;

  const timeoutSeconds =
    typeof data.payload.timeoutSeconds == "number" &&
    data.payload.timeoutSeconds % 1 === 0 &&
    data.payload.timeoutSeconds >= 1 &&
    data.payload.timeoutSeconds <= 5
      ? data.payload.timeoutSeconds
      : false;

  if (id) {
    if (protocol || url || method || successCodes || timeoutSeconds) {
      _data.read("checks", id, function (err, checkData) {
        if (!err && checkData) {
          const token =
            typeof data.headers.token == "string" ? data.headers.token : false;

          handlers._tokens.verifyToken(
            token,
            checkData.userPhone,
            function (tokenIsValid) {
              if (tokenIsValid) {
                if (protocol) {
                  checkData.protocol = protocol;
                }

                if (url) {
                  checkData.url = url;
                }

                if (method) {
                  checkData.method = method;
                }

                if (successCodes) {
                  checkData.successCodes = successCodes;
                }

                if (timeoutSeconds) {
                  checkData.timeoutSeconds = timeoutSeconds;
                }

                _data.update("checks", id, checkData, function (err) {
                  if (!err) {
                    callback(200, { Error: "Проверка была успешно обновлена" });
                  } else {
                    callback(500, {
                      Error: "Произошла ошибка при обновлении проверки",
                    });
                  }
                });
              } else {
                callback(403, {
                  Error:
                    "Вы не авторизованы. Чтобы обновить проверку необходимо сперва авторизироваться",
                });
              }
            }
          );
        } else {
          callback(400, { Error: "Не существует такого checkId" });
        }
      });
    } else {
      callback(400, {
        Error: "Отсутствует любое поле для последующего обновления",
      });
    }
  } else {
    callback(400, {
      Error: "Пропущено одно или несколько из обязательных полей",
    });
  }
};

handlers._checks.delete = function (data, callback) {
  const id =
    typeof data.queryStringObject.id == "string" &&
    data.queryStringObject.id.trim().length == 20
      ? data.queryStringObject.id.trim()
      : false;
  if (id) {
    _data.read("checks", id, function (err, checkData) {
      if (!err && checkData) {
        const token =
          typeof data.headers.token == "string" ? data.headers.token : false;
        handlers._tokens.verifyToken(
          token,
          checkData.userPhone,
          function (tokenIsValid) {
            if (tokenIsValid) {
              _data.delete("checks", id, function (err) {
                if (!err) {
                  _data.read(
                    "users",
                    checkData.userPhone,
                    function (err, userData) {
                      if (!err) {
                        const userChecks =
                          typeof userData.checks == "object" &&
                          userData.checks instanceof Array
                            ? userData.checks
                            : [];

                        const checkPosition = userChecks.indexOf(id);
                        if (checkPosition > -1) {
                          userChecks.splice(checkPosition, 1);
                          userData.checks = userChecks;
                          _data.update(
                            "users",
                            checkData.userPhone,
                            userData,
                            function (err) {
                              if (!err) {
                                callback(200, {
                                  message: "Проверка была успешно удалена",
                                });
                              } else {
                                callback(500, {
                                  Error:
                                    "Произошла ошибка при обновлении данных пользователя",
                                });
                              }
                            }
                          );
                        } else {
                          callback(500, {
                            Error:
                              "Не удалось найти проверку в списке проверок пользователя. Проверка не была удалена из списка проверок",
                          });
                        }
                      } else {
                        callback(500, {
                          Error:
                            "Не удалось найти пользователя, который создал проверку. Проверка не была удалена из списка проверок.",
                        });
                      }
                    }
                  );
                } else {
                  callback(500, {
                    Error: "Произошла ошибка при удалении проверки",
                  });
                }
              });
            } else {
              callback(403);
            }
          }
        );
      } else {
        callback(400, { Error: "Проверка не была найдена по данной ID" });
      }
    });
  } else {
    callback(400, { Error: "Указан не верный формат ID" });
  }
};
