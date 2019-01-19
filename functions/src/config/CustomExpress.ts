import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as expressValidator from 'express-validator';
import * as cors from 'cors';
import { RoutesStack } from '../routes/RoutesStack';

class App {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.defineMiddleware();
    this.publishRoutes();
  }

  private defineMiddleware(): void {
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(expressValidator());
  }

  private publishRoutes(): void {
    let routesStack = new RoutesStack(this.app);
    routesStack.publishRoutes();
  }
}

export default new App().app;
