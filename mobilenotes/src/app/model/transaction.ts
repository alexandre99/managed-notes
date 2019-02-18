import { TypeTransaction } from "./typeTransaction";

export class Transaction {
    constructor(
        public value?: number,
        public typeTransaction?: TypeTransaction,
        public date?: Date,
        public category: string = 'indefinida') { }

}