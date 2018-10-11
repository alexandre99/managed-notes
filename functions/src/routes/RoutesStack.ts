import * as express from "express";
import { NotesRouter } from "./notes/NotesRouter";
export class RoutesStack {
  public run(app: express.Application): void {
    new NotesRouter(app).defineRoutes();
  }
}
