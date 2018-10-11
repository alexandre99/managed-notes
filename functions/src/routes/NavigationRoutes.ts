import { IRoute } from "express";
import * as express from "express";
export abstract class NavigationRoutes {
  protected router: IRoute;
  constructor(protected app: express.Application) {
    this.setBaseUrl();
  }
  abstract defineRoutes(): void;
  protected abstract getBaseUrl(): string;
  private setBaseUrl(): void {
    this.router = this.app.route(this.getBaseUrl());
  }
  protected getRouter(): IRoute {
    return this.router;
  }
}
