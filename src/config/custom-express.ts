import * as express from "express";
import * as bodyParser from "body-parser";

export function app() {
    let app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    return app;
}
