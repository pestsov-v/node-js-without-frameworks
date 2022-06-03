export default class DatabaseHelper {
  static parseObj(str: string) {
    try {
      const obj = JSON.parse(str);
      return obj;
    } catch (e) {
      return {};
    }
  }
}