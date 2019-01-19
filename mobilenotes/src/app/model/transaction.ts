import { TypeTransaction } from "./typeTransaction";

export class Transaction {
    constructor(
        public value?: string, 
        public typeTransaction?: TypeTransaction, 
        public date?: Date, 
        category: string = 'indefinida') { }
}