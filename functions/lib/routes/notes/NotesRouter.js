"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NavigationRoutes_1 = require("../NavigationRoutes");
const NoteService_1 = require("./../../service/NoteService");
const Constantes_1 = require("./../../util/Constantes");
class NotesRouter extends NavigationRoutes_1.NavigationRoutes {
    constructor(app) {
        super(app);
    }
    getBaseUrl() {
        return Constantes_1.Constantes.END_POINT_NOTES;
    }
    defineRoutes() {
        this.defineRouteFindAllNotes();
        this.defineRouteSaveNote();
        this.defineRouteFindByTitle();
        this.defineRouteUpdateNote();
    }
    defineRouteFindAllNotes() {
        this.getRouter().get((req, res) => {
            new NoteService_1.NoteService(req, res).findAllNotes();
        });
    }
    defineRouteSaveNote() {
        this.getRouter().post((req, res) => {
            new NoteService_1.NoteService(req, res).saveNote();
        });
    }
    defineRouteUpdateNote() {
        this.getRouter().put((req, res) => {
            new NoteService_1.NoteService(req, res).updateNote();
        });
    }
    defineRouteFindByTitle() {
        this.app
            .route(this.getBaseUrl() + '/:title/title')
            .get((req, res) => new NoteService_1.NoteService(req, res).findByTitle());
    }
}
exports.NotesRouter = NotesRouter;
//# sourceMappingURL=NotesRouter.js.map