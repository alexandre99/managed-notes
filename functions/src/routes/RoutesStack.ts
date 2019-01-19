import * as express from 'express';
import { NavigationRoutes } from './NavigationRoutes';
import { NotesRouter } from './NotesRouter';
import { TransactionRouter } from './TransactionRouter';
export class RoutesStack {

  private routes: NavigationRoutes[] = [];

  constructor(app: express.Application) {
    this.routes.push(new NotesRouter(app), new TransactionRouter(app));
  }

  public publishRoutes(): void {
    this.routes.forEach(navigation => navigation.publishRoutes());
  }


}
