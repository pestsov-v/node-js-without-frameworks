import pages from "./gui.pages";
import GUIBase from "./gui.base";

import { 
  accCreate, 
  accDeleted, 
  accEdit, 
  checksCreate,
  checksEdit, 
  checksList, 
  index, 
  sessCreate, 
  sessDeleted
 } from "./gui.data";

export default class GUIController {
  static index = GUIBase.renderPage(pages.index, index);
  static accountCreate = GUIBase.renderPage(pages.accCreate, accCreate);
  static sessionCreate = GUIBase.renderPage(pages.sessCreate, sessCreate);
  static accountEdit = GUIBase.renderPage(pages.accEdit, accEdit);
  static sessionDeleted = GUIBase.renderPage(pages.sessDeleted, sessDeleted);
  static accountDeleted = GUIBase.renderPage(pages.accDeleted, accDeleted);
  static checksCreate = GUIBase.renderPage(pages.checksCreate, checksCreate);
  static checksList = GUIBase.renderPage(pages.checksList, checksList);
  static checksEdit = GUIBase.renderPage(pages.checksEdit, checksEdit);
}