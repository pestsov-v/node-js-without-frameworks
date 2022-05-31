const statusCode = require("../../../core/base/statusCode");
const {
  USER_WAS_CREATED_MESSAGE,
  USER_NOT_CREATED_MESSAGE,
  USER_SUCCESS_CREATE_MESSAGE,
  USER_WAS_BEEN_CREATED_MESSAGE,
  INVALID_USER_PHONE_MESSAGE,
  USER_NOT_AUTH_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  USER_NOT_FIELDS_TO_UPDATE_MESSAGE,
  USER_NOT_EXISTS_MESSAGE,
  USER_CAN_NOT_UPDATE_MESSAGE,
  USER_SUCCESS_UPDATE_MESSAGE,
  MISS_REQUIRED_FIELDS_MESSAGE,
  USER_PHONE_NOT_FOUND_MESSAGE,
  USER_SUCCESS_DELETE_MESSAGE,
  USER_CAN_NOT_DELETE_MESSAGE,
} = require("./user.constants");

exports.USER_WAS_CREATED = {
  statusCode: statusCode.BAD_REQUEST,
  Error: USER_WAS_CREATED_MESSAGE,
};

exports.USER_NOT_CREATED = {
  statusCode: statusCode.BAD_REQUEST,
  Error: USER_NOT_CREATED_MESSAGE,
};

exports.USER_SUCCESS_CREATE = (phone: string) => {
  return {
    statusCode: statusCode.OK,
    message: USER_SUCCESS_CREATE_MESSAGE(phone),
  };
};

exports.USER_HAS_BEEN_CREATED = {
  statusCode: statusCode.BAD_REQUEST,
  Error: USER_WAS_BEEN_CREATED_MESSAGE,
};

exports.MISS_REQUIRED_FIELDS = {
  statusCode: statusCode.BAD_REQUEST,
  Error: MISS_REQUIRED_FIELDS_MESSAGE,
};

exports.INVALID_USER_PHONE = {
  statusCode: statusCode.BAD_REQUEST,
  Error: INVALID_USER_PHONE_MESSAGE,
};

exports.USER_NOT_AUTH = {
  statusCode: statusCode.FORBIDDEN,
  Error: USER_NOT_AUTH_MESSAGE,
};

exports.USER_NOT_FOUND = {
  statusCode: statusCode.NOT_FOUND,
  Error: USER_NOT_FOUND_MESSAGE,
};

exports.USER_NOT_FIELDS_TO_UPDATE = {
  statusCode: statusCode.BAD_REQUEST,
  Error: USER_NOT_FIELDS_TO_UPDATE_MESSAGE,
};

exports.USER_NOT_EXISTS = {
  statusCode: statusCode.BAD_REQUEST,
  Error: USER_NOT_EXISTS_MESSAGE,
};

exports.USER_CAN_NOT_UPDATE = {
  statusCode: statusCode.SERVER_ERROR,
  Error: USER_CAN_NOT_UPDATE_MESSAGE,
};

exports.USER_SUCCESS_UPDATE = {
  statusCode: statusCode.OK,
  message: USER_SUCCESS_UPDATE_MESSAGE,
};

exports.USER_PHONE_NOT_FOUND = {
  statusCode: statusCode.NOT_FOUND,
  Error: USER_PHONE_NOT_FOUND_MESSAGE,
};

exports.USER_SUCCESS_DELETE = {
  statusCode: statusCode.OK,
  message: USER_SUCCESS_DELETE_MESSAGE,
};

exports.USER_CAN_NOT_DELETE = {
  statusCode: statusCode.OK,
  message: USER_CAN_NOT_DELETE_MESSAGE,
};
