import { Repository } from "./Repository";
import { TransactionDTO } from "../model/transaction/TransactionDTO";
import { FirebaseDbHelper } from "../helper/FirebaseDbHelper";
import { Transaction } from "../model/transaction/transaction";

export class TransactionRepository implements Repository<Transaction, TransactionDTO> {
    private transactionsCollection;

    constructor() {
        this.transactionsCollection = FirebaseDbHelper.getDb().collection('transactions');
    }

    save(transaction: Transaction, callBackSuccess: any, callBackErr: any) {
        this.transactionsCollection
            .add(transaction.convertObjectToPlain())
            .then(callBackSuccess)
            .catch(callBackErr);
    }
    findAll(callBackSuccess: any, callBackErr: any) {
        this.transactionsCollection
            .get()
            .then(callBackSuccess)
            .catch(callBackErr);
    }
    update(transactionDTO: TransactionDTO, callBackSuccess: any, callBackErr: any) {
        const transaction = transactionDTO.transaction;
        this.transactionsCollection
            .doc(transactionDTO.id)
            .update(transaction)
            .then(callBackSuccess)
            .catch(callBackErr);
    }
    findById(id: string, callBackSuccess: any, callBackErr: any) {
        this.transactionsCollection
            .doc(id)
            .get()
            .then(callBackSuccess)
            .catch(callBackErr);
    }

    delete(id: string, callBackSuccess, callBackErr) {
        this.transactionsCollection
            .doc(id)
            .delete()
            .then(callBackSuccess)
            .catch(callBackErr);
    }


}