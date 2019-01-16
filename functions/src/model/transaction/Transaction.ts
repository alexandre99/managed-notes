import { classToPlain, plainToClass } from "class-transformer";
import { Model } from "../Model";
import { TypeCategory } from "../TypeCategory";

export class Transaction implements Model<Transaction> {
    constructor(private value?: String,
        private typeCategory?: TypeCategory,
        private date?: Date,
        private category = 'indefinida') { }
    convertPlainToObject(plain: any): Transaction {
        return plainToClass(Transaction, plain as Object);
    } convertObjectToPlain() {
        return classToPlain(this);
    }
}