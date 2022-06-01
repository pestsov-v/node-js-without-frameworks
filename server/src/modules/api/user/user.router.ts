import UserController from "./user.controller";

export default class UserRouter {
  public static post =  UserController.createUser;
  public static get = UserController.getUser;
  public static put = UserController.updateUser;
  public static delete = UserController.deleteUser;
}
