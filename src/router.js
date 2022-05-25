const UserModule = require("./modules/user/user.module");
const TokenModule = require("./modules/token/token.module");
const CheckModule = require("./modules/check/check.module");

const router = {
  users: UserModule,
  tokens: TokenModule,
  checks: CheckModule,
};

module.exports = router;
