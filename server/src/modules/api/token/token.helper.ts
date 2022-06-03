import statusCode from "../../../core/base/statusCode.enum";
import { ITokenObject } from "./dto/tokenObject.dto";
import { INCORRECT_TOKEN } from "./token.exception";
import { tokenCallback } from "./type/tokenCallback.type";

export default class TokenHelper {
  static createRandomString(strLength: number, callback: tokenCallback) {

    if (strLength) {
      const possibleCharacters = "abcdefghijklmnopqrstuvwxyz0123456789";

      let str = "";
      let i = 1;
      for (i = 1; i <= strLength; i++) {
        const randomCharacter = possibleCharacters.charAt(
          Math.floor(Math.random() * possibleCharacters.length)
        );
        str += randomCharacter;
      }

      return str;
    } else {
      return callback(statusCode.BAD_REQUEST, INCORRECT_TOKEN);
    }
  }

  static createObj(phone: string, tokenId: string): ITokenObject {
    const expires = Date.now() + 1000 * 60 * 60;

    return {
      phone: phone,
      id: tokenId,
      expires: expires,
    };
  }
}