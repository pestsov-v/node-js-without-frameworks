const UserModule = require("./api/user/user.module");
const TokenModule = require("./api/token/token.module");
const CheckModule = require("./api/check/check.module");
const handlers = require("./handlers");

const router = {
  "": handlers.index,
  "account/create": handlers.accountCreate,
  "account/edit": handlers.accountEdit,
  "account/deleted": handlers.accountDeleted,
  "session/create": handlers.sessionCreate,
  "session/deleted": handlers.sessionDeleted,
  "checks/all": handlers.checksList,
  "checks/create": handlers.checksCreate,
  "checks/edit": handlers.checksEdit,
  "checks/deleted": handlers.checksDeleted,
  "favicon.ico": handlers.favicon,
  public: handlers.public,
  "api/users": UserModule,
  "api/tokens": TokenModule,
  "api/checks": CheckModule,
};

module.exports = router;
