import { classToPlain, plainToClass, Exclude, Expose } from "class-transformer";
import { Model } from "../Model";
import { TypeTransaction } from "../TypeTransaction";

export class Transaction implements Model<Transaction> {

    private value: string;
    @Expose({name: 'typeTransaction'}) 
    private type: TypeTransaction;
    private date: Date;
    private category: string = 'indefinida';

    constructor() { }

    convertPlainToObject(plain: any): Transaction {
        return plainToClass(Transaction, plain as Object);
    }

    convertObjectToPlain() {
        return classToPlain(this);
    }

    get typeTransaction(): string {
        return TypeTransaction[this.type];
    }

    
    set typeTransaction(type: string) {
        this.type = TypeTransaction[type];
    }
}