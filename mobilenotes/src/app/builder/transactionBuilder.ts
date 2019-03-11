import { TypeTransaction } from './../model/typeTransaction';
import { NumberUtils } from '../util/numberUtils';
import { Transaction } from '../model/transaction';
export class TransactionBuilder {

    private value: number;
    private typeTransaction: TypeTransaction;
    private date: Date;
    private category: string = 'indefinida';

    constructor() { }

    addValue(value: number): TransactionBuilder {
        this.value = value;
        return this;
    }

    addTypeTransaction(typeTransaction: string): TransactionBuilder {
        this.typeTransaction = TypeTransaction[typeTransaction];
        return this;
    }

    addDate(date: string): TransactionBuilder {
        this.date = new Date(date);
        return this;
    }

    addCategory(category: string): TransactionBuilder {
        this.category = category;
        return this;
    }

    build(): Transaction {
        return new Transaction(this.value, this.typeTransaction, this.date, this.category);
    }
}