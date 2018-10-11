import * as express from "express";
import * as bodyParser from "body-parser";
import * as expressValidator from "express-validator";
import { RoutesStack } from "../routes/RoutesStack";

class App {
  public app: express.Application;
  private routesStack: RoutesStack = new RoutesStack();
  constructor() {
    this.app = express();
    this.defineMiddleware();
    this.defineRoutes();
  }

  private defineMiddleware(): void {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(expressValidator());
  }

  private defineRoutes(): void {
    this.routesStack.run(this.app);
  }
}

export default new App().app;
