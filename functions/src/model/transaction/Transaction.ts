import { classToPlain, plainToClass } from "class-transformer";
import { Model } from "../Model";
import { TypeCategory } from "../TypeCategory";

export class Transaction implements Model<Transaction> {
    constructor(private value: String,
        private category = 'indefinida',
        private typeCategory: TypeCategory,
        private date: Date) { }
    convertPlainToObject(plain: any): Transaction {
        return plainToClass(Transaction, plain as Object);
    } convertObjectToPlain() {
        return classToPlain(this);
    }
}