const statusCode = require("../base/statusCode");
const {
  FILE_ERROR_CLOSED_MESSAGE,
  FILE_ERROR_WRITED_MESSAGE,
  FILE_HAS_BEEN_EXISTS_MESSAGE,
  FILE_ERROR_UPDATE_MESSAGE,
  FILE_ERROR_DELETE_EXISTS_FILE_MESSAGE,
} = require("./db.constants");

exports.FILE_ERROR_CLOSED = {
  statusCode: statusCode.SERVER_ERROR,
  Error: FILE_ERROR_CLOSED_MESSAGE,
};

exports.FILE_ERROR_WRITED = {
  statusCode: statusCode.SERVER_ERROR,
  Error: FILE_ERROR_WRITED_MESSAGE,
};

exports.FILE_HAS_BEEN_EXISTS = {
  statusCode: statusCode.SERVER_ERROR,
  Error: FILE_HAS_BEEN_EXISTS_MESSAGE,
};

exports.FILE_ERROR_DELETE = {
  statusCode: statusCode.SERVER_ERROR,
  Error: this.FILE_ERROR_DELETE_MESSAGE,
};

exports.FILE_ERROR_UPDATE = {
  statusCode: statusCode.SERVER_ERROR,
  Error: FILE_ERROR_UPDATE_MESSAGE,
};

exports.FILE_ERROR_DELETE_EXISTS_FILE = {
  statusCode: statusCode.SERVER_ERROR,
  Error: FILE_ERROR_DELETE_EXISTS_FILE_MESSAGE,
};
