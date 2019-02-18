import { classToPlain, Exclude, plainToClass } from "class-transformer";
import { Model } from "../Model";
import { TypeTransaction } from "../TypeTransaction";

export class Transaction implements Model<Transaction> {

    private value: number;
    @Exclude({ toPlainOnly: true })
    private typeTransaction: TypeTransaction;
    private date: Date;
    private category: string = 'indefinida';

    constructor() { }

    convertPlainToObject(plain: any): Transaction {
        return plainToClass(Transaction, plain as Object);
    }

    convertObjectToPlain() {
        let typeTransaction = this.typeTransaction;
        let transactionPlain = <any> classToPlain(this);
        transactionPlain.typeTransaction = typeTransaction;
        return transactionPlain
    }
}