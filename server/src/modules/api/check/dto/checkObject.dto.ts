import { method } from "../../../../core/base/method.enum";

export interface ICheckObject {
    protocol: string;
    url: string;
    method: method;
    code: number[];
    time: number;
}