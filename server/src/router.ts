import UserModule from "./modules/api/user/user.module";
import TokenModule from "./modules/api/token/token.module";
import CheckModule from "./modules/api/check/check.module";
const GUIModule = require("./modules/gui/gui.module");

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

export default router