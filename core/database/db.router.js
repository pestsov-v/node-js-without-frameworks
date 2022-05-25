const DatabaseController = require("./db.controller");

class DatabaseRouter {
  create = DatabaseController.dbCreate;
  read = DatabaseController.dbRead;
  update = DatabaseController.dbUpdate;
  delete = DatabaseController.dbDelete;
  list = DatabaseController.dbList;
}

module.exports = new DatabaseRouter();
