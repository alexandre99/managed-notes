import { Router, Request, Response, NextFunction } from 'express';
export class NotesRouter {
    public router: Router
    constructor() {
        this.router = Router();
        this.init();
    }
    public get(req: Request, res: Response, next: NextFunction) {
        res.send('Notes');
    }
    init() {
        this.router.get('/', this.get);
    }
}
const notesRouter = new NotesRouter();
notesRouter.init();
export default notesRouter.router;