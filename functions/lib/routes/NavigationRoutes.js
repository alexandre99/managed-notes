"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NavigationRoutes {
    constructor(app) {
        this.app = app;
        this.setBaseUrl();
    }
    setBaseUrl() {
        this.router = this.app.route(this.getBaseUrl());
    }
    getRouter() {
        return this.router;
    }
}
exports.NavigationRoutes = NavigationRoutes;
//# sourceMappingURL=NavigationRoutes.js.map