const UserModule = require("../modules/api/user/user.module");
const TokenModule = require("../modules/api/token/token.module");
const CheckModule = require("../modules/api/check/check.module");
const GUIModule = require("../modules/gui/gui.module");

const router = {
  "": GUIModule.index,
  "account/create": GUIModule.accountCreate,
  "account/edit": GUIModule.accountEdit,
  "account/deleted": GUIModule.accountDeleted,
  "session/create": GUIModule.sessionCreate,
  "session/deleted": GUIModule.sessionDeleted,
  "checks/all": GUIModule.checksList,
  "checks/create": GUIModule.checksCreate,
  "checks/edit": GUIModule.checksEdit,
  "checks/deleted": GUIModule.checksDeleted,
  "favicon.ico": GUIModule.favicon,
  public: GUIModule.public,
  "api/users": UserModule,
  "api/tokens": TokenModule,
  "api/checks": CheckModule,
};

module.exports = router;
