import { Request, Response, IRoute } from "express";
import * as express from "express";
import { NavigationRoutes } from "../NavigationRoutes";
import { Constantes } from "./../../util/Constantes";
import { Note } from "./../../model/Note";
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
    console.log(this.getRouter());
    this.getRouter().get((req: Request, res: Response) => {
      res.json({ message: "teste" });
    });
  }

  private defineRouteSaveNote(): void {
    this.getRouter().post((req: Request, res: Response) => {
      console.log(req.body);
      res.json({ message: "note received success" });
    });
  }
}
