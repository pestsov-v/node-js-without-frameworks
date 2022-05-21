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

  console.log(phone);
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

handlers.ping = function (data, callback) {
  callback(200);
};

handlers.notFound = function (data, callback) {
  callback(404);
};

module.exports = handlers;
