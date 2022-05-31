class TokenHelper {
  createRandomString(strLength) {
    strLength =
      typeof strLength == "number" && strLength > 0 ? strLength : false;

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
      return false;
    }
  }

  createObj(phone, tokenId) {
    const expires = Date.now() + 1000 * 60 * 60;

    return {
      phone: phone,
      id: tokenId,
      expires: expires,
    };
  }
}

module.exports = new TokenHelper();
