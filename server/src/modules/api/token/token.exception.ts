import { statusCode } from "../../../core/base/enum/statusCode.enum";
import {
  INCORRECT_PHONE_FIELD_MESSAGE, 
  INCORRECT_PASSWORD_FIELD_MESSAGE, 
  USER_NOT_FOUND_WITH_PHONE_MESSAGE, 
  PASSWORD_NOT_MATCHED_MESSAGE, 
  USER_NOT_CREATED_MESSAGE,
  INCORRECT_TOKEN_MESSAGE, 
  USER_NOT_FOUND_MESSAGE, 
  MISSED_REQUIRED_FIELDS_MESSAGE, 
  TOKEN_NOT_EXISTS_MESSAGE, 
  TOKEN_HAS_TIED_MESSAGE, 
  TOKEN_UPDATE_ERROR_MESSAGE, 
  TOKEN_UPDATE_SUCCESS_MESSAGE, 
  TOKEN_DELETE_SUCCESS_MESSAGE, 
  TOKEN_ERROR_MESSAGE, 
  TOKEN_NOT_FOUND_MESSAGE
 } from "./token.constants";

export const INCORRECT_PHONE_FIELD = {
  statusCode: statusCode.BAD_REQUEST,
  Error: INCORRECT_PHONE_FIELD_MESSAGE,
};

export const INCORRECT_PASSWORD_FIELD = {
  statusCode: statusCode.BAD_REQUEST,
  Error: INCORRECT_PASSWORD_FIELD_MESSAGE,
};

export const USER_NOT_FOUND_WITH_PHONE = {
  statusCode: statusCode.BAD_REQUEST,
  Error: USER_NOT_FOUND_WITH_PHONE_MESSAGE,
};

export const PASSWORD_NOT_MATCHED = {
  statusCode: statusCode.BAD_REQUEST,
  Error: PASSWORD_NOT_MATCHED_MESSAGE,
};

export const USER_NOT_CREATED = {
  statusCode: statusCode.BAD_REQUEST,
  Error: USER_NOT_CREATED_MESSAGE,
};

export const INCORRECT_TOKEN = {
  statusCode: statusCode.BAD_REQUEST,
  Error: INCORRECT_TOKEN_MESSAGE,
};

export const USER_NOT_FOUND = {
  statusCode: statusCode.NOT_FOUND,
  Error: USER_NOT_FOUND_MESSAGE,
};

export const MISSED_REQUIRED_FIELDS = {
  statusCode: statusCode.BAD_REQUEST,
  Error: MISSED_REQUIRED_FIELDS_MESSAGE,
};

export const TOKEN_NOT_EXISTS = {
  statusCode: statusCode.BAD_REQUEST,
  Error: TOKEN_NOT_EXISTS_MESSAGE,
};

export const TOKEN_HAS_TIED = {
  statusCode: statusCode.BAD_REQUEST,
  Error: TOKEN_HAS_TIED_MESSAGE,
};

export const TOKEN_UPDATE_ERROR = {
  statusCode: statusCode.SERVER_ERROR,
  Error: TOKEN_UPDATE_ERROR_MESSAGE,
};

export const TOKEN_UPDATE_SUCCESS = {
  statusCode: statusCode.OK,
  message: TOKEN_UPDATE_SUCCESS_MESSAGE,
};

export const TOKEN_NOT_FOUND = {
  statusCode: statusCode.OK,
  message: TOKEN_NOT_FOUND_MESSAGE,
};

export const TOKEN_ERROR = {
  statusCode: statusCode.OK,
  message: TOKEN_ERROR_MESSAGE,
};

export const TOKEN_DELETE_SUCCESS = {
  statusCode: statusCode.OK,
  message: TOKEN_DELETE_SUCCESS_MESSAGE,
};
