const _data = require("./data");
const helpers = require("./helpers");
const response = require("./lib.constants");
const { createUserSuccess } = require("./responses/createUserSuccess.response");
const {
  userHasBeenCreated,
  missedRequiredFields,
} = require("./user.exception");

const handlers = {};

handlers.users = function (data, callback) {
  const acceptableMethods = ["post", "get", "put", "delete"];
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._users[data.method](data, callback);
  } else {
    callback(405);
  }
};

handlers._users = {};

handlers._users.post = function (data, callback) {
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

  const phone =
    typeof data.payload.phone == "string" &&
    data.payload.phone.trim().length == 10
      ? data.payload.phone.trim()
      : false;

  const password =
    typeof data.payload.password == "string" &&
    data.payload.password.trim().length > 0
      ? data.payload.password.trim()
      : false;

  const tosAggrement =
    typeof data.payload.tosAggrement == "boolean" &&
    data.payload.tosAggrement == true
      ? true
      : false;

  if (firstName && lastName && phone && password && tosAggrement) {
    _data.read("users", phone, function (err, data) {
      console.log(data);
      if (err) {
        const hashPassword = helpers.hash(password);
        if (hashPassword) {
          const userObject = {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            hashPassword: hashPassword,
            tosAggrement: true,
          };

          _data.create("users", phone, userObject, function (err) {
            if (!err) {
              callback(200, {
                message: createUserSuccess(phone),
              });
            } else {
              console.log(err);
              callback(500, {
                Error: response.USER_NOT_CREATED,
              });
            }
          });
        } else {
          callback(500, { Error: PASSWORD_HAS_NOT_HASHED });
        }
      } else {
        callback(400, userHasBeenCreated);
      }
    });
  } else {
    callback(400, missedRequiredFields);
  }
};

handlers._users.get = function (data, callback) {
  const phone =
    typeof data.queryStringObject.phone == "string" &&
    data.queryStringObject.phone.trim().length == 10
      ? data.queryStringObject.phone.trim()
      : false;

  if (phone) {
    _data.read("users", phone, function (err, data) {
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
    callback(400, { Error: "Указан не верный формат номера телефона" });
  }
};

handlers._users.put = function (data, callback) {
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
              callback(200, { message: "Пользователь успешно обновлён" });
            } else {
              console.log(err);
              callback(500, {
                Error:
                  "Невозможно удалить пользователя из-за ошибки на сервере",
              });
            }
          });
        } else {
          callback(400, { Error: "Такого пользователя не существует" });
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

handlers._users.delete = function (data, callback) {
  const phone =
    typeof data.queryStringObject.phone == "string" &&
    data.queryStringObject.phone.trim().length == 10
      ? data.queryStringObject.phone.trim()
      : false;

  if (phone) {
    _data.read("users", phone, function (err) {
      if (!err) {
        _data.delete("users", phone, function (err) {
          if (!err) {
            callback(200, { message: "Пользователь успешно удалён" });
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
    callback(400, { Error: "Указан не верный формат номера телефона" });
  }
};

handlers.tokens = function (data, callback) {
  const acceptableMethods = ["post", "get", "put", "delete"];
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._tokens[data.method](data, callback);
  } else {
    callback(405);
  }
};

handlers._tokens = {};

handlers._tokens.post = function (data, callback) {
  const phone =
    typeof data.payload.phone == "string" &&
    data.payload.phone.trim().length == 10
      ? data.payload.phone.trim()
      : false;

  const password =
    typeof data.payload.password == "string" &&
    data.payload.password.trim().length > 0
      ? data.payload.password.trim()
      : false;

  if (phone && password) {
    _data.read("users", phone, function (err, userData) {
      if (!err && userData) {
        const hashPassword = helpers.hash(password);
        if (hashPassword == userData.hashPassword) {
          const tokenId = helpers.createRandomString(20);
          const expires = Date.now() + 1000 * 60;

          const tokenObject = {
            phone: phone,
            id: tokenId,
            expires: expires,
          };

          _data.create("tokens", tokenId, tokenObject, function (err) {
            if (!err) {
              callback(200, tokenObject);
            } else {
              callback(00, {
                Error: "Произошла ошибка при создании токена пользователя",
              });
            }
          });
        } else {
          callback(400, { Error: "Пароли не совпадают" });
        }
      } else {
        callback(400, {
          Error: "Пользователь с таким номером телефона не был найден",
        });
      }
    });
  } else {
    callback(400, {
      Error: "Пропущено одно или несколько из обязательных полей",
    });
  }
};

handlers._tokens.get = function (data, callback) {
  const id =
    typeof data.queryStringObject.id == "string" &&
    data.queryStringObject.id.trim().length == 20
      ? data.queryStringObject.id.trim()
      : false;

  if (id) {
    _data.read("tokens", id, function (err, tokenData) {
      if (!err && tokenData) {
        callback(200, tokenData);
      } else {
        callback(404, {
          Error: "Пользователь с таким id не был найден",
        });
      }
    });
  } else {
    callback(400, { Error: "Указан не верный формат id" });
  }
};

handlers._tokens.put = function (data, callback) {
  const id =
    typeof data.payload.id == "string" && data.payload.id.trim().length == 20
      ? data.payload.id.trim()
      : false;

  const extend =
    typeof data.payload.extend == "boolean" && data.payload.extend == true
      ? true
      : false;

  if (id && extend) {
    _data.read("tokens", id, function (err, tokenData) {
      if (!err && tokenData) {
        if (tokenData.expires > Date.now()) {
          tokenData.expires = Date.now() * 1000 * 60 * 60;

          _data.update("tokens", id, tokenData, function (err) {
            if (!err) {
              callback(200, { message: "Токен был успешно обновлён" });
            } else {
              callback(500, {
                Error: "Произошла ошибка при обновлении срока давности токена",
              });
            }
          });
        } else {
          callback(400, {
            Error: "Токен уже просрочен и не может быть продлен",
          });
        }
      } else {
        callback(400, { Error: "Токен с таким id ещё не был создан" });
      }
    });
  } else {
    callback(400, {
      Error: "Пропущено одно или несколько из обязательных полей",
    });
  }
};

handlers._tokens.delete = function (data, callback) {
  const id =
    typeof data.queryStringObject.id == "string" &&
    data.queryStringObject.id.trim().length == 20
      ? data.queryStringObject.id.trim()
      : false;

  if (id) {
    _data.read("tokens", id, function (err) {
      if (!err) {
        _data.delete("tokens", id, function (err) {
          if (!err) {
            callback(200, { message: "Токен успешно удалён" });
          } else {
            callback(400, { Error: "Такого токена не существует" });
          }
        });
      } else {
        callback(400, {
          Error: "Такой токен не был найден",
        });
      }
    });
  } else {
    callback(400, { Error: "Указан не верный формат токена" });
  }
};

handlers._tokens.verifyToken = function (tokenId, phone, callback) {
  _data.read("tokens", tokenId, function (err, tokenData) {
    if (!err && tokenData) {
      if (tokenData.phone == phone && tokenData.expires > Date.now()) {
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  });
};

handlers.ping = function (data, callback) {
  callback(200);
};

handlers.notFound = function (data, callback) {
  callback(404);
};

module.exports = handlers;