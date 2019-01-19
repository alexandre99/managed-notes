import { classToPlain, plainToClass, Exclude } from "class-transformer";
import { Model } from "../Model";
import { TypeTransaction } from "../TypeTransaction";

export class Transaction implements Model<Transaction> {

    private value: string;
    @Exclude() private typeTransaction: TypeTransaction;
    private date: Date;
    private category: string = 'indefinida';

    constructor() { }

    convertPlainToObject(plain: any): Transaction {
        return plainToClass(Transaction, plain as Object);
    }

    convertObjectToPlain() {
        return classToPlain(this);
    }

    get type(): string {
        return TypeTransaction[this.typeTransaction];
    }

    set type(typeTransaction: string) {
        this.typeTransaction = TypeTransaction[typeTransaction];
    }
}