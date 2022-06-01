import fs from "fs";
import zlib from "zlib";

import { 
  APEND_NOT_FOUND, 
  APPEND_ERROR_FILE, 
  APPEND_ERROR_CLOSED 
} from "./logger.constants";

import { errOrNull } from "./type/errorOrNull.type";
import { appendCallback } from "./type/appendCallback.type";
import { listCallback } from "./type/listCallback.type";
import { compressCallback } from "./type/compressCallback.type";
import { decompressCallback } from "./type/decompressCallback.type";
import { truncateCallback } from "./type/truncateCallback.type";

export default class LoggerService {
    static appendFile(filePath: string, str: string, callback: appendCallback): void {
    fs.open(filePath, "a", (err, fileDescriptor) => {
      if (err) return callback(APEND_NOT_FOUND);

      fs.appendFile(fileDescriptor, str + "\n", (err) => {
        if (err) return callback(APPEND_ERROR_FILE);

        fs.close(fileDescriptor, (err) => {
          if (err) return callback(APPEND_ERROR_CLOSED);
          return callback(false); 
        });
      });
    });
  }

  static listFiles(baseDir: string, includeCompressedLogs: string, callback: listCallback): void {
    fs.readdir(baseDir, (err: errOrNull, data: string[]) => {
      if (err) return callback(err, data);
      const trimmedFileNames: string[] = [];
      data.forEach((fileName) => {
        if (fileName.indexOf(".log") > -1) {
          trimmedFileNames.push(fileName.replace(".log", ""));
        }
        if (fileName.indexOf(".gz.b64") > -1 && includeCompressedLogs) {
          trimmedFileNames.push(fileName.replace(".gz.b64", ""));
        }
      });
      return callback(false, trimmedFileNames);
    });
  }

  static compressFile(sourceFile: string, destFile: string, callback: compressCallback): void {
    fs.readFile(sourceFile, "utf-8", (err: errOrNull, inputsString: string) => {
      if (err) return callback(err);

      zlib.gzip(inputsString, (err: errOrNull, buffer: Buffer) => {
        if (err) return callback(err);

        fs.open(destFile, "wx", (err: errOrNull, fileDescriptor: number) => {
          if (err) return callback(err);

          fs.writeFile(fileDescriptor, buffer.toString("base64"), (err: errOrNull) => {
            if (err) return callback(err);

            fs.close(fileDescriptor, (err: errOrNull) => {
              if (err) return callback(err);
              return callback(false);
            });
          });
        });
      });
    });
  }

  static decompressFile(filePath: string, callback: decompressCallback): void {
    fs.readFile(filePath, "utf8", (err: errOrNull, str: string) => {
      if (err) return callback(err);
      const inputBuffer: Buffer = Buffer.from(str, "base64");

      zlib.unzip(inputBuffer, (err: errOrNull, outputBuffer: Buffer) => {
        if (err) return callback(err);
        const str: string = outputBuffer.toString();
        return callback(false, str);
      });
    });
  }

  static truncateFile(logName: string, callback: truncateCallback): void {
    return fs.truncate(logName, 0, (err: errOrNull) => {
      if (err) return callback(err);
      return callback(false);
    });
  }
}