const crypto = require("crypto");
const config = require("../../../config/variables.config");

class UserHelper {
  hashPassword(str) {
    if (typeof str == "string" && str.length > 0) {
      const hash = crypto
        .createHmac("sha256", config.hashingSecret)
        .update(str)
        .digest("hex");
      return hash;
    } else {
      return false;
    }
  }

  hashUserObject(hashObj) {
    const { firstName, lastName, phone, hashPassword } = hashObj;
    return {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      hashPassword: hashPassword,
      tosAggrement: true,
    };
  }
}

module.exports = new UserHelper();
