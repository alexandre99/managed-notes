"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const RoutesStack_1 = require("../routes/RoutesStack");
class App {
    constructor() {
        this.routesStack = new RoutesStack_1.RoutesStack();
        this.app = express();
        this.defineMiddleware();
        this.defineRoutes();
    }
    defineMiddleware() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(expressValidator());
    }
    defineRoutes() {
        this.routesStack.run(this.app);
    }
}
exports.default = new App().app;
//# sourceMappingURL=CustomExpress.js.map