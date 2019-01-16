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
    this.defineRouteFindById();
    this.defineRouteDeleteNote();
  }

  private defineRouteFindAllNotes() {
    this.getRouter().get((req: Request, res: Response) => {
      new NoteService(req, res).findAll();
    });
  }

  private defineRouteSaveNote() {
    this.getRouter().post((req: Request, res: Response) => {
      new NoteService(req, res).save();
    });
  }

  private defineRouteUpdateNote() {
    this.getRouter().put((req: Request, res: Response) => {
      new NoteService(req, res).update();
    });
  }

  private defineRouteDeleteNote() {
    this.app
      .route(this.getBaseUrl() + '/:id')
      .delete((req: Request, res: Response) =>
        new NoteService(req, res).delete()
      );
  }

  private defineRouteFindByTitle() {
    this.app
      .route(this.getBaseUrl() + '/:title/title')
      .get((req: Request, res: Response) =>
        new NoteService(req, res).findByTitle()
      );
  }

  private defineRouteFindById() {
    this.app
      .route(this.getBaseUrl() + '/:id/id')
      .get((req: Request, res: Response) =>
        new NoteService(req, res).findById()
      );
  }
}
