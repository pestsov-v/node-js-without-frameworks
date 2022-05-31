const GUIController = require("./gui.controller");
const GUIPublic = require("./gui.public");

class GUIModule {
  index = GUIController.index;
  accountCreate = GUIController.accountCreate;
  sessionCreate = GUIController.sessionCreate;
  accountEdit = GUIController.accountEdit;
  sessionDeleted = GUIController.sessionDeleted;
  accountDeleted = GUIController.accountDeleted;
  checksCreate = GUIController.checksCreate;
  checksList = GUIController.checksList;
  checksEdit = GUIController.checksEdit;
  favicon = GUIPublic.favicon;
  public = GUIPublic.public;
}

module.exports = new GUIModule();
