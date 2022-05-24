const {
  USER_WAS_CREATED_MESSAGE,
  USER_NOT_CREATED_MESSAGE,
  USER_SUCCESS_CREATE_MESSAGE,
  USER_WAS_BEEN_CREATED_MESSAGE,
  INVALID_USER_PHONE_MESSAGE,
  USER_NOT_AUTH_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
} = require("./user.constants");

exports.USER_WAS_CREATED = {
  statusCode: 400,
  Error: USER_WAS_CREATED_MESSAGE,
};

exports.USER_NOT_CREATED = {
  statusCode: 400,
  Error: USER_NOT_CREATED_MESSAGE,
};

exports.USER_SUCCESS_CREATE = (phone) => {
  return {
    statusCode: 400,
    message: USER_SUCCESS_CREATE_MESSAGE(phone),
  };
};

exports.USER_HAS_BEEN_CREATED = {
  statusCode: 500,
  Error: USER_WAS_BEEN_CREATED_MESSAGE,
};

exports.INVALID_USER_PHONE = {
  statusCode: 400,
  Error: INVALID_USER_PHONE_MESSAGE,
};

exports.USER_NOT_AUTH = {
  statusCode: 403,
  Error: USER_NOT_AUTH_MESSAGE,
};

exports.USER_NOT_FOUND = {
  statusCode: 404,
  Error: USER_NOT_FOUND_MESSAGE,
};
