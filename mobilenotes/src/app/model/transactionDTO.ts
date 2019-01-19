import { Transaction } from "./transaction";

export class TransactionDTO {
    constructor(public id?: string, public transaction?: Transaction) { }
}