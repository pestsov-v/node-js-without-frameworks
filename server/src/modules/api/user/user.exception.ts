import statusCode from "../../../core/base/statusCode.enum";

import { 
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
  USER_GET_SUCCESS_MESSAGE, 
  MISSED_METHOD_MESSAGE 
} from "./user.constants";

export const USER_WAS_CREATED = {
  statusCode: statusCode.BAD_REQUEST,
  Error: USER_WAS_CREATED_MESSAGE,
};

export const USER_NOT_CREATED = {
  statusCode: statusCode.BAD_REQUEST,
  Error: USER_NOT_CREATED_MESSAGE,
};

export const USER_SUCCESS_CREATE = (phone: string) => {
  return {
    statusCode: statusCode.OK,
    message: USER_SUCCESS_CREATE_MESSAGE(phone),
  };
};

export const USER_GET_SUCCESS = (data: any) => {
  return {
    statusCode: statusCode.OK,
    message: USER_GET_SUCCESS_MESSAGE(data)
  }
}

export const MISSED_METHOD = {
  statusCode: statusCode.BAD_REQUEST,
  Error: MISSED_METHOD_MESSAGE
}

export const USER_HAS_BEEN_CREATED = {
  statusCode: statusCode.BAD_REQUEST,
  Error: USER_WAS_BEEN_CREATED_MESSAGE,
};

export const MISS_REQUIRED_FIELDS = {
  statusCode: statusCode.BAD_REQUEST,
  Error: MISS_REQUIRED_FIELDS_MESSAGE,
};

export const INVALID_USER_PHONE = {
  statusCode: statusCode.BAD_REQUEST,
  Error: INVALID_USER_PHONE_MESSAGE,
};

export const USER_NOT_AUTH = {
  statusCode: statusCode.FORBIDDEN,
  Error: USER_NOT_AUTH_MESSAGE,
};

export const USER_NOT_FOUND = {
  statusCode: statusCode.NOT_FOUND,
  Error: USER_NOT_FOUND_MESSAGE,
};

export const USER_NOT_FIELDS_TO_UPDATE = {
  statusCode: statusCode.BAD_REQUEST,
  Error: USER_NOT_FIELDS_TO_UPDATE_MESSAGE,
};

export const USER_NOT_EXISTS = {
  statusCode: statusCode.BAD_REQUEST,
  Error: USER_NOT_EXISTS_MESSAGE,
};

export const USER_CAN_NOT_UPDATE = {
  statusCode: statusCode.SERVER_ERROR,
  Error: USER_CAN_NOT_UPDATE_MESSAGE,
};

export const USER_SUCCESS_UPDATE = {
  statusCode: statusCode.OK,
  message: USER_SUCCESS_UPDATE_MESSAGE,
};

export const USER_PHONE_NOT_FOUND = {
  statusCode: statusCode.NOT_FOUND,
  Error: USER_PHONE_NOT_FOUND_MESSAGE,
};

export const USER_SUCCESS_DELETE = {
  statusCode: statusCode.OK,
  message: USER_SUCCESS_DELETE_MESSAGE,
};

export const USER_CAN_NOT_DELETE = {
  statusCode: statusCode.OK,
  message: USER_CAN_NOT_DELETE_MESSAGE,
};
