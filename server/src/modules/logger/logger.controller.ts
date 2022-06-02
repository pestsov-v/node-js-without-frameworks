import path from "path";
import LoggerService from "./logger.service";

import { appendCallback } from "./type/appendCallback.type";
import { listCallback } from "./type/listCallback.type";
import { compressCallback } from "./type/compressCallback.type";
import { decompressCallback } from "./type/decompressCallback.type";
import { truncateCallback } from "./type/truncateCallback.type";

const baseDir = path.join(__dirname, "/../../../data/logs/");

export default class LoggerController {
  static append(file: string, str: string, callback: appendCallback) {
    const filePath: string = `${baseDir}${file}.log`;
    LoggerService.appendFile(filePath, str, callback);
  }

  static list(includeCompressedLogs: boolean, callback: listCallback): void {
    LoggerService.listFiles(baseDir, includeCompressedLogs, callback);
  }

  static compress(logId: string, newFileId: string, callback: compressCallback): void {
    const sourceFile: string = `${baseDir}${logId}.log`;
    const destFile: string = `${baseDir}${newFileId}.gz.b64`;
    LoggerService.compressFile(sourceFile, destFile, callback);
  }

  static decompress(fileId: string, callback: decompressCallback): void {
    const fileName: string = `${fileId}.gz.b64`;
    const filePath: string = `${baseDir}${fileName}`;
    LoggerService.decompressFile(filePath, callback);
  }

  static truncate(logId: string, callback: truncateCallback): void {
    const logName: string = `${baseDir}${logId}.log`;
    LoggerService.truncateFile(logName, callback);
  }
}