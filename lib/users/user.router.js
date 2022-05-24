const _data = require("../data");
const helpers = require("../helpers");
const { missedRequiredFields } = require("../user.exception");
const UserValidate = require("./user.validate");
const UserHelper = require("./user.helper");
const {
  USER_WAS_CREATED,
  USER_SUCCESS_CREATE,
  USER_HAS_BEEN_CREATED,
} = require("./user.exception");

const users = {};

users.users = function (data, callback) {
  const acceptableMethods = ["post", "get", "put", "delete"];
  if (acceptableMethods.indexOf(data.method) > -1) {
    users._users[data.method](data, callback);
  } else {
    callback(405);
  }
};

users._users = {};

users._users.post = function (data, callback) {
  const firstName = UserValidate.nameValidate(data.payload.firstName);
  const lastName = UserValidate.nameValidate(data.payload.lastName);
  const phone = UserValidate.phoneValidate(data.payload.phone);
  const password = UserValidate.passwordValidate(data.payload.password);
  const tosAggrement = UserValidate.tosAggValidate(data.payload.tosAggrement);

  if (!firstName || !lastName || !phone || !password || !tosAggrement) {
    return callback(400, missedRequiredFields);
  }

  _data.read("users", phone, function (err, data) {
    if (!err) return callback(400, USER_HAS_BEEN_CREATED);
    const hashPassword = UserHelper.hashPassword(password);
    if (!hashPassword) callback(400, USER_WAS_CREATED);

    const userObject = UserHelper.hashUserObject(
      firstName,
      lastName,
      phone,
      hashPassword
    );

    _data.create("users", phone, userObject, function (err) {
      if (err) return callback(500, USER_NOT_CREATED_);
      callback(200, USER_SUCCESS_CREATE(phone));
    });
  });
};

users._users.get = function (data, callback) {
  const phone =
    typeof data.queryStringObject.phone == "string" &&
    data.queryStringObject.phone.trim().length == 10
      ? data.queryStringObject.phone.trim()
      : false;

  if (phone) {
    const token =
      typeof data.headers.token == "string" ? data.headers.token : false;

    handlers._tokens.verifyToken(token, phone, function (tokenIsValid) {
      if (tokenIsValid) {
        _data.read("tokens", token, function (err, data) {
          if (!err && data) {
            delete data.hashPassword;
            callback(200, data);
          } else {
            callback(404, {
              Error: "Пользователь с таким номером телефона не был найден",
            });
          }
        });
      } else {
        callback(403, {
          Error:
            "Вы не авторизованы. Чтобы получить данные пользователя необходимо сперва авторизироваться",
        });
      }
    });
  } else {
    callback(400, { Error: "Указан не верный формат номера телефона" });
  }
};

users._users.put = function (data, callback) {
  const phone =
    typeof data.payload.phone == "string" &&
    data.payload.phone.trim().length == 10
      ? data.payload.phone.trim()
      : false;

  const firstName =
    typeof data.payload.firstName == "string" &&
    data.payload.firstName.trim().length > 0
      ? data.payload.firstName.trim()
      : false;

  const lastName =
    typeof data.payload.lastName == "string" &&
    data.payload.lastName.trim().length > 0
      ? data.payload.lastName.trim()
      : false;

  const password =
    typeof data.payload.password == "string" &&
    data.payload.password.trim().length > 0
      ? data.payload.password.trim()
      : false;

  if (phone) {
    if (firstName || lastName || password) {
      const token =
        typeof data.headers.token == "string" ? data.headers.token : false;

      handlers._tokens.verifyToken(token, phone, function (tokenIsValid) {
        if (tokenIsValid) {
          _data.read("users", phone, function (err, userData) {
            if (!err && userData) {
              if (firstName) {
                userData.firstName = firstName;
              }

              if (lastName) {
                userData.lastName = lastName;
              }

              if (password) {
                userData.hashPassword = helpers.hash(password);
              }

              _data.update("users", phone, userData, function (err) {
                if (!err) {
                  callback(200, {
                    message: "Пользователь успешно обновлён",
                  });
                } else {
                  console.log(err);
                  callback(500, {
                    Error:
                      "Невозможно удалить пользователя из-за ошибки на сервере",
                  });
                }
              });
            } else {
              callback(400, {
                Error: "Такого пользователя не существует",
              });
            }
          });
        } else {
          callback(403, {
            Error:
              "Вы не авторизованы. Чтобы обновить данные пользователя необходимо сперва авторизироваться",
          });
        }
      });
    } else {
      callback(400, {
        Error: "Отстуствуют любое из полей, которое следует обновить",
      });
    }
  } else {
    callback(400, { Error: "Указан не верный формат номера телефона" });
  }
};

users._users.delete = function (data, callback) {
  const phone =
    typeof data.queryStringObject.phone == "string" &&
    data.queryStringObject.phone.trim().length == 10
      ? data.queryStringObject.phone.trim()
      : false;

  if (phone) {
    const token =
      typeof data.headers.token == "string" ? data.headers.token : false;

    handlers._tokens.verifyToken(token, phone, function (tokenIsValid) {
      if (tokenIsValid) {
        _data.read("users", phone, function (err, userData) {
          if (!err && userData) {
            _data.delete("users", phone, function (err) {
              if (!err) {
                let userChecks =
                  typeof userData.checks == "object" &&
                  userData.checks instanceof Array
                    ? userData.checks
                    : [];

                let checksToDelete = userChecks.length;
                if (checksToDelete > 0) {
                  let checksDeleted = 0;
                  let deletionErrors = false;

                  userChecks.forEach(function (checkId) {
                    _data.delete("checks", checkId, function (err) {
                      if (err) {
                        deletionErrors = true;
                      }
                      checksDeleted++;
                      if (checksDeleted == checksToDelete) {
                        if (!deletionErrors) {
                          callback(200, {
                            message: "Пользователь успешно удалён",
                          });
                        } else {
                          callback(500, {
                            Error:
                              "Возникла ошибка при попытке удаления проверок пользователя, в ходе процесса удаления самого пользователя",
                          });
                        }
                      }
                    });
                  });
                } else {
                  callback(200, { message: "Пользователь успешно удалён" });
                }
              } else {
                callback(400, { Error: "Такого пользователя не существует" });
              }
            });
          } else {
            callback(400, {
              Error: "Пользователь с таким номером телефона не был найден",
            });
          }
        });
      } else {
        callback(403, {
          Error:
            "Вы не авторизованы. Чтобы удалить пользователя необходимо сперва авторизироваться",
        });
      }
    });
  } else {
    callback(400, { Error: "Указан не верный формат номера телефона" });
  }
};

module.exports = users;
