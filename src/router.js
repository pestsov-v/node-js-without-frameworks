const UserModule = require("./modules/user/user.module");
const TokenModule = require("./modules/token/token.module");
const CheckModule = require("./modules/check/check.module");
const handlers = require("./handlers");

const router = {
  "": handlers.index,
  "account/create": handlers.AccountCreate,
  "account/edit": handlers.AccountEdit,
  "account/deleted": handlers.AccountDeleted,
  "session/create": handlers.sessionCreate,
  "session/deleted": handlers.sessionDeleted,
  "checks/all": handlers.checksList,
  "checks/create": handlers.checksCreate,
  "checks/edit": handlers.checksEdit,
  "checks/deleted": handlers.checksDeleted,
  "api/users": UserModule,
  "api/tokens": TokenModule,
  "api/checks": CheckModule,
};

module.exports = router;
