import * as express from "express";
import { Request, Response } from "express";
import { NavigationRoutes } from "../NavigationRoutes";
import { Note } from './../../model/Note';
import { Constantes } from "./../../util/Constantes";
export class NotesRouter extends NavigationRoutes {
  constructor(app: express.Application) {
    super(app);
  }

  protected getBaseUrl(): string {
    return Constantes.END_POINT_NOTES;
  }

  defineRoutes(): void {
    this.defineRouteGetNotes();
    this.defineRouteSaveNote();
  }

  private defineRouteGetNotes(): void {
    this.getRouter().get((req: Request, res: Response) => {
      res.json({ message: "teste" });
    });
  }

  private defineRouteSaveNote(): void {
    this.getRouter().post((req: Request, res: Response) => {
      let note = new Note().convertPlainToObject(req.body);
      res.json({ message: "note received success" });
    });
  }
}
