import * as express from 'express';
import { Request, Response } from 'express';
import { NavigationRoutes } from '../NavigationRoutes';
import { NoteService } from './../../service/NoteService';
import { Constantes } from './../../util/Constantes';

export class NotesRouter extends NavigationRoutes {
  constructor(app: express.Application) {
    super(app);
  }

  protected getBaseUrl(): string {
    return Constantes.END_POINT_NOTES;
  }

  defineRoutes() {
    this.defineRouteFindAllNotes();
    this.defineRouteSaveNote();
    this.defineRouteFindByTitle();
    this.defineRouteUpdateNote();
  }

  private defineRouteFindAllNotes() {
    this.getRouter().get((req: Request, res: Response) => {
      new NoteService(req, res).findAllNotes();
    });
  }

  private defineRouteSaveNote() {
    this.getRouter().post((req: Request, res: Response) => {
      new NoteService(req, res).saveNote();
    });
  }

  private defineRouteUpdateNote() {
    this.getRouter().put((req: Request, res: Response) => {
      new NoteService(req, res).updateNote();
    });
  }

  private defineRouteFindByTitle() {
    this.app
      .route(this.getBaseUrl() + '/:title/title')
      .get((req: Request, res: Response) => 
        new NoteService(req, res).findByTitle()
      );
  }
}
