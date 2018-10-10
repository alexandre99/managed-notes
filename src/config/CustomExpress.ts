import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as expressValidator from 'express-validator'
import notesRouter from '../resources/NotesRouter';

class App {
    public express: express.Application;
    constructor() {
        this.express = express();
        this.definemiddleware();
        this.defineRoutes();
    }

    private definemiddleware(): void {
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.json());
        this.express.use(expressValidator());
    }

    private defineRoutes(): void {
        this.express.use('/notes', notesRouter);
    }
}

export default new App().express;

