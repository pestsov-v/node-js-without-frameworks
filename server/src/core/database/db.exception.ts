import { statusCode } from "../base/enum/statusCode.enum";

import {
  FILE_ERROR_CLOSED_MESSAGE, 
  FILE_ERROR_WRITED_MESSAGE, 
  FILE_HAS_BEEN_EXISTS_MESSAGE, 
  FILE_ERROR_UPDATE_MESSAGE, 
  FILE_ERROR_DELETE_EXISTS_FILE_MESSAGE, 
  FILE_ERROR_DELETE_MESSAGE
} from "./db.constants";

export const FILE_ERROR_CLOSED = {
  statusCode: statusCode.SERVER_ERROR,
  Error: FILE_ERROR_CLOSED_MESSAGE,
};

export const FILE_ERROR_WRITED = {
  statusCode: statusCode.SERVER_ERROR,
  Error: FILE_ERROR_WRITED_MESSAGE,
};

export const FILE_HAS_BEEN_EXISTS = {
  statusCode: statusCode.SERVER_ERROR,
  Error: FILE_HAS_BEEN_EXISTS_MESSAGE,
};

export const FILE_ERROR_DELETE = {
  statusCode: statusCode.SERVER_ERROR,
  Error: FILE_ERROR_DELETE_MESSAGE,
};

export const FILE_ERROR_UPDATE = {
  statusCode: statusCode.SERVER_ERROR,
  Error: FILE_ERROR_UPDATE_MESSAGE,
};

export const FILE_ERROR_DELETE_EXISTS_FILE = {
  statusCode: statusCode.SERVER_ERROR,
  Error: FILE_ERROR_DELETE_EXISTS_FILE_MESSAGE,
};