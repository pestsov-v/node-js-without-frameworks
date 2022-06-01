import LoggerController from "./logger.controller";

export default class LoggerModule {
  static append = LoggerController.append;
  static list = LoggerController.list;
  static compress = LoggerController.compress;
  static decompress = LoggerController.decompress;
  static truncate = LoggerController.truncate;
}