import GUIController from "./gui.controller";
import GUIPublic from "./gui.public";

export default class GUIModule {
  static index = GUIController.index;
  static accountCreate = GUIController.accountCreate;
  static sessionCreate = GUIController.sessionCreate;
  static accountEdit = GUIController.accountEdit;
  static sessionDeleted = GUIController.sessionDeleted;
  static accountDeleted = GUIController.accountDeleted;
  static checksCreate = GUIController.checksCreate;
  static checksList = GUIController.checksList;
  static checksEdit = GUIController.checksEdit;
  static favicon = GUIPublic.favicon;
  static public = GUIPublic.public;
}