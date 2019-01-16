import { Request, Response } from "express";
import { Transaction } from "../model/transaction/Transaction";
import { TransactionRepository } from "../repository/TransactionRepository";
import { Service } from "./Service";
import { TransactionDTO } from "../model/transaction/TransactionDTO";

export class TransactionService implements Service<Transaction, TransactionDTO>{

    constructor(private req: Request, private resp: Response) { }

    save() {
        const args = [
            { field: "value", message: "O campo valor é obrigatório" },
            { field: "category", message: "O campo categoria é obrigatório" },
            { field: "typeCategory", message: "O campo tipo categoria é obrigatório" },
            { field: "date", message: "O campo data é obrigatório" }
        ];
        let err = this.validateData(args);
        if (err) {
            this.resp.status(400).json(err);
            return;
        }

        let transaction = new Transaction().convertPlainToObject(this.req.body);
        new TransactionRepository().save(
            transaction,
            () => this.callBackSuccess('Transação criada com sucesso', 200),
            err => this.callBackErr(err)
        )
    }

    update() {
        const args = [
            { field: "transaction.value", message: "O campo valor é obrigatório" },
            { field: "transaction.category", message: "O campo categoria é obrigatório" },
            { field: "transaction.typeCategory", message: "O campo tipo categoria é obrigatório" },
            { field: "transaction.date", message: "O campo data é obrigatório" },
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
        throw new Error("Method not implemented.");
    }
    findById() {
        throw new Error("Method not implemented.");
    }
    delete() {
        throw new Error("Method not implemented.");
    }

    validateData(args: any[]) {
        args.forEach(arg => this.req.assert(arg.field, arg.message).notEmpty());
        return this.req.validationErrors();
    }

    callBackFindAllSuccess(snapshot: any) {
        throw new Error("Method not implemented.");
    }
    callBackFindByIdSuccess(doc: any) {
        throw new Error("Method not implemented.");
    }

    callBackSuccess(msg: string, status: number = 200) {
        this.resp.status(status).json({ message: msg });
    }

    callBackErr(err) {
        this.resp.status(500).json(err);
    }

}