import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as expressValidator from 'express-validator'

class App {
    private express: express.Application;
    constructor() {
        this.express = express();
        this.definemiddleware();
    }

    private definemiddleware(): void {
        this.express.use(bodyParser.urlencoded({ extended: true }));
        this.express.use(bodyParser.json());
        this.express.use(expressValidator());
    }

    getExpress(): express.Application {
        return this.express;
    }
}

export default new App().getExpress();

