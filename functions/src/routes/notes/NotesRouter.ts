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

  defineRoutes(): void {
    this.defineRouteFindAllNotes();
    this.defineRouteSaveNote();
  }

  private defineRouteFindAllNotes(): void {
    this.getRouter().get((req: Request, res: Response) => {
      new NoteService(req, res).findAllNotes();
    });
  }

  private defineRouteSaveNote(): void {
    this.getRouter().post((req: Request, res: Response) => {
      new NoteService(req, res).saveNote();
    });
  }
}
