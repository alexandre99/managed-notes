import { NavigationRoutes } from "./NavigationRoutes";
import * as express from 'express';
import { Request, Response } from 'express';
import { Constantes } from "../util/Constantes";
import { TransactionService } from "../service/TransactionService";
export class TransactionRouter extends NavigationRoutes {

    constructor(app: express.Application) {
        super(app)
    }

    protected getBaseUrl(): string {
        return Constantes.END_POINT_TRANSACTION;
    }

    publishRoutes() {
        this.defineRouteFindAllTransactions();
        this.defineRouteSaveTransaction();
        this.defineRouteUpdateTransaction();
        this.defineRouteFindById();
        this.defineRouteDeleteTransaction();
    }

    private defineRouteFindAllTransactions() {
        this.getRouter().get((req: Request, res: Response) => {
            new TransactionService(req, res).findAll();
        });
    }

    private defineRouteSaveTransaction() {
        this.getRouter().post((req: Request, res: Response) => {
            new TransactionService(req, res).save();
        });
    }

    private defineRouteUpdateTransaction() {
        this.getRouter().put((req: Request, res: Response) => {
            new TransactionService(req, res).update();
        });
    }

    private defineRouteDeleteTransaction() {
        this.app
            .route(this.getBaseUrl() + '/:id')
            .delete((req: Request, res: Response) =>
                new TransactionService(req, res).delete()
            );
    }

    private defineRouteFindById() {
        this.app
            .route(this.getBaseUrl() + '/:id/id')
            .get((req: Request, res: Response) =>
                new TransactionService(req, res).findById()
            );
    }


}