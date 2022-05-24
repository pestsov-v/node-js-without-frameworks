const TokenController = require("./token.controller");

class TokenRouter {
  post = TokenController.createToken;
  get = TokenController.getToken;
  put = TokenController.udpateToken;
  delete = TokenController.deleteToken;
  verifyToken = TokenController.verifyToken;
}

module.exports = new TokenRouter();
