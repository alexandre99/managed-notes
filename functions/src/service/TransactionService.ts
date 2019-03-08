import { Transaction } from '../model/transaction/Transaction';
import { TransactionRepository } from '../repository/TransactionRepository';
import { Response, Request } from 'express';
import { Service } from './Service';
import { TransactionDTO } from '../model/transaction/TransactionDTO';

export class TransactionService implements Service<Transaction, TransactionDTO>{

    constructor(private req: Request, private resp: Response) { }

    save() {
        const args = [
            { field: 'value', message: 'O campo valor é obrigatório' },
            { field: 'category', message: 'O campo categoria é obrigatório' },
            { field: 'typeTransaction', message: 'O campo tipo transação é obrigatório' },
            { field: 'date', message: 'O campo data é obrigatório' }
        ];
        let err = this.validateData(args);
        if (err) {
            this.resp.status(400).json(err);
            return;
        }

        let transaction = new Transaction().convertPlainToObject(this.req.body);
        new TransactionRepository().save(
            transaction,
            () => this.callBackSuccess('Transação criada com sucesso', 201),
            err => this.callBackErr(err)
        )
    }

    update() {
        const args = [
            { field: 'transaction.value', message: 'O campo valor é obrigatório' },
            { field: 'transaction.category', message: 'O campo categoria é obrigatório' },
            { field: 'transaction.typeTransaction', message: 'O campo tipo transação é obrigatório' },
            { field: 'transaction.date', message: 'O campo data é obrigatório' },
            { field: 'id', message: 'O campo id é obrigatório' }
        ];

        let err = this.validateData(args);
        if (err) {
            this.resp.status(400).json(err);
            return;
        }
        let transactionDTO = new TransactionDTO().convertPlainToObject(this.req.body);
        new TransactionRepository().update(
            transactionDTO,
            () => this.callBackSuccess('Transação atualizada com sucesso'),
            err => this.callBackErr(err)
        )
    }

    findAll() {
        new TransactionRepository().findAll(
            snapshot => this.callBackFindAllSuccess(snapshot),
            err => this.callBackErr(err)
        )
    }
    findById() {
        let id = this.req.params.id;
        new TransactionRepository().findById(
            id,
            doc => this.callBackFindByIdSuccess(doc),
            err => this.callBackErr(err)
        )
    }
    delete() {
        let id = this.req.params.id;
        new TransactionRepository().delete(
            id,
            () => this.callBackSuccess('Transação removida com sucesso'),
            err => this.callBackErr(err)
        );
    }

    validateData(args: any[]) {
        args.forEach(arg => this.req.assert(arg.field, arg.message).notEmpty());
        return this.req.validationErrors();
    }

    callBackFindAllSuccess(snapshot) {
        let transactionsDTO: TransactionDTO[] = [];
        snapshot.forEach(doc => {
            let transaction = new Transaction().convertPlainToObject(doc.data());
            let transactionDTO = new TransactionDTO(doc.id, transaction);
            transactionsDTO.push(transactionDTO);
        });
        this.resp.json(transactionsDTO);
    }
    callBackFindByIdSuccess(doc) {
        let transaction = new Transaction().convertPlainToObject(doc.data());
        let transactionDTO = new TransactionDTO(doc.id, transaction);
        this.resp.json(transactionDTO);
    }

    callBackSuccess(msg: string, status: number = 200) {
        this.resp.status(status).json({ message: msg });
    }

    callBackErr(err) {
        this.resp.status(500).json(err);
    }

}