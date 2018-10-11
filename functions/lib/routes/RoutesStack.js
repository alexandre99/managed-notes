"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NotesRouter_1 = require("./notes/NotesRouter");
class RoutesStack {
    run(app) {
        new NotesRouter_1.NotesRouter(app).defineRoutes();
    }
}
exports.RoutesStack = RoutesStack;
//# sourceMappingURL=RoutesStack.js.map