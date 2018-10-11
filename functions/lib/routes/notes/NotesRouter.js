"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NavigationRoutes_1 = require("../NavigationRoutes");
const Note_1 = require("./../../model/Note");
const Constantes_1 = require("./../../util/Constantes");
class NotesRouter extends NavigationRoutes_1.NavigationRoutes {
    constructor(app) {
        super(app);
    }
    getBaseUrl() {
        return Constantes_1.Constantes.END_POINT_NOTES;
    }
    defineRoutes() {
        this.defineRouteGetNotes();
        this.defineRouteSaveNote();
    }
    defineRouteGetNotes() {
        this.getRouter().get((req, res) => {
            res.json({ message: "teste" });
        });
    }
    defineRouteSaveNote() {
        this.getRouter().post((req, res) => {
            let note = new Note_1.Note().convertPlainToObject(req.body);
            res.json({ message: "note received success" });
        });
    }
}
exports.NotesRouter = NotesRouter;
//# sourceMappingURL=NotesRouter.js.map