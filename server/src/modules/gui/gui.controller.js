const pages = require("./gui.pages");

const GUIData = require("./gui.data");
const GUIBase = require("./gui.base");

class GUIController {
  index = GUIBase.renderPage(pages.index, GUIData.index);
  accountCreate = GUIBase.renderPage(pages.accCreate, GUIData.accCreate);
  sessionCreate = GUIBase.renderPage(pages.sessCreate, GUIData.sessCreate);
  accountEdit = GUIBase.renderPage(pages.accEdit, GUIData.accEdit);
  sessionDeleted = GUIBase.renderPage(pages.sessDeleted, GUIData.sessDeleted);
  accountDeleted = GUIBase.renderPage(pages.accDeleted, GUIData.accDeleted);
  checksCreate = GUIBase.renderPage(pages.checksCreate, GUIData.checksCreate);
  checksList = GUIBase.renderPage(pages.checksList, GUIData.checksList);
  checksEdit = GUIBase.renderPage(pages.checksEdit, GUIData.checksEdit);
}

module.exports = new GUIController();
