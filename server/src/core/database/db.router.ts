import DatabaseController from "./db.controller";

export default class DatabaseRouter {
  static create = DatabaseController.dbCreate;
  static read = DatabaseController.dbRead;
  static update = DatabaseController.dbUpdate;
  static delete = DatabaseController.dbDelete;
  static list = DatabaseController.dbList;
}