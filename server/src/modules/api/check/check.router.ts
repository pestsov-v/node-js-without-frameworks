import CheckController from "./check.controller";

export default class CheckRouter {
  public static post = CheckController.postCheck;
  public static get = CheckController.getCheck;
  public static put = CheckController.updateCheck;
  public static delete = CheckController.deleteCheck;
}