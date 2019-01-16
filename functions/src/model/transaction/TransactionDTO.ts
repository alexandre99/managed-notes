import { plainToClass, classToPlain } from "class-transformer";
import { Transaction } from "./Transaction";

export class TransactionDTO {
    constructor(public id?: String, public transaction?: Transaction) { }
    convertPlainToObject(plain: any): TransactionDTO {
        return plainToClass(TransactionDTO, plain as Object);
    }
    convertObjectToPlain() {
        return classToPlain(this);
    }
}