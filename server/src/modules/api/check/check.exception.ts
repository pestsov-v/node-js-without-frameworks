import { statusCode } from "../../../core/base/enum/statusCode.enum";

import {
  MISSED_REQUIRE_FIEILDS_MESSAGE, 
  USER_NOT_AUTH_MESSAGE, 
  GET_MAX_CHECKS_MESSAGE, 
  SERVER_CREATE_CHECK_MESSAGE, 
  SERVER_UPDATE_CHECK_MESSAGE, 
  INCORRECT_PHONE_MESSAGE, 
  TOKEN_NOT_FOUND_MESSAGE, 
  USER_NOT_AUTH_GET_MESSAGE, 
  EMPTY_UPDATE_FILEDS_MESSAGE, 
  CHECK_NOT_FOUND_MESSAGE, 
  CHECK_NOT_AUTH_UPDATE_MESSAGE, 
  SERVER_ERROR_UPDATE_MESSAGE, 
  CHECK_UPDATE_SUCCESS_MESSAGE, 
  CHECK_NOT_FOUND_ID_MESSAGE, 
  CHECK_NOT_AUTH_DELETE_MESSAGE, 
  SERVER_ERROR_DELETE_MESSAGE, 
  USER_NOT_FOUND_MESSAGE,
  USER_EMPTY_CHECKS_MESSAGE, 
  CHECK_DELETE_SUCCESS_MESSAGE, 
  INVALID_HOSTNAME_MESSAGE 
} from "./check.constants";

export const MISSED_REQUIRE_FIEILDS = {
  statusCode: statusCode.BAD_REQUEST,
  Error: MISSED_REQUIRE_FIEILDS_MESSAGE,
};

export const USER_NOT_AUTH = {
  statusCode: statusCode.FORBIDDEN,
  Error: USER_NOT_AUTH_MESSAGE,
};

export const GET_MAX_CHECKS = {
  statusCode: statusCode.BAD_REQUEST,
  Error: GET_MAX_CHECKS_MESSAGE,
};

export const SERVER_CREATE_CHECK = {
  statusCode: statusCode.SERVER_ERROR,
  Error: SERVER_CREATE_CHECK_MESSAGE,
};

export const SERVER_UPDATE_CHECK = {
  statusCode: statusCode.SERVER_ERROR,
  Error: SERVER_UPDATE_CHECK_MESSAGE,
};

export const INCORRECT_PHONE = {
  statusCode: statusCode.BAD_REQUEST,
  Error: INCORRECT_PHONE_MESSAGE,
};

export const TOKEN_NOT_FOUND = (id: string) => {
  return {
    statusCode: statusCode.BAD_REQUEST,
    Error: TOKEN_NOT_FOUND_MESSAGE(id),
  };
};

export const USER_NOT_AUTH_GET = {
  statusCode: statusCode.FORBIDDEN,
  Error: USER_NOT_AUTH_GET_MESSAGE,
};

export const EMPTY_UPDATE_FILEDS = {
  statusCode: statusCode.BAD_REQUEST,
  Error: EMPTY_UPDATE_FILEDS_MESSAGE,
};

export const CHECK_NOT_FOUND = {
  statusCode: statusCode.NOT_FOUND,
  Error: CHECK_NOT_FOUND_MESSAGE,
};

export const CHECK_NOT_AUTH_UPDATE = {
  statusCode: statusCode.FORBIDDEN,
  Error: CHECK_NOT_AUTH_UPDATE_MESSAGE,
};

export const SERVER_ERROR_UPDATE = {
  statusCode: statusCode.SERVER_ERROR,
  Error: SERVER_ERROR_UPDATE_MESSAGE,
};

export const SERVER_UPDATE_SUCCESS = {
  statusCode: statusCode.OK,
  message: CHECK_UPDATE_SUCCESS_MESSAGE,
};

export const CHECK_NOT_FOUND_ID = {
  statusCode: statusCode.NOT_FOUND,
  Error: CHECK_NOT_FOUND_ID_MESSAGE,
};

export const CHECK_NOT_AUTH_DELETE = {
  statusCode: statusCode.FORBIDDEN,
  Error: CHECK_NOT_AUTH_DELETE_MESSAGE,
};

export const SERVER_ERROR_DELETE = {
  statusCode: statusCode.SERVER_ERROR,
  Error: SERVER_ERROR_DELETE_MESSAGE,
};

export const USER_NOT_FOUND = {
  statusCode: statusCode.NOT_FOUND,
  Error: USER_NOT_FOUND_MESSAGE,
};

export const USER_EMPTY_CHECKS = {
  statusCode: statusCode.SERVER_ERROR,
  Error: USER_EMPTY_CHECKS_MESSAGE,
};

export const CHECK_DELETE_SUCCESS = {
  statusCode: statusCode.OK,
  message: CHECK_DELETE_SUCCESS_MESSAGE,
};

export const INVALID_HOSTNAME = {
  statusCode: statusCode.BAD_REQUEST,
  Error: INVALID_HOSTNAME_MESSAGE,
};
