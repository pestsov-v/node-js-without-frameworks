import { strOrBool } from "../guard/isString.guard";

export interface IHashObj {
    firstName: strOrBool;
    lastName: strOrBool;
    phone: strOrBool;
    hashPassword: strOrBool;
}