import TokenController from "./token.controller";

export default class TokenRouter {
  public static post = TokenController.createToken;
  public static get = TokenController.getToken;
  public static put = TokenController.udpateToken;
  public static delete = TokenController.deleteToken;
  public static verifyToken = TokenController.verifyToken;
}