"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Note_1 = require("../model/Note/Note");
const NoteRepository_1 = require("../repository/NoteRepository");
const NoteDTO_1 = require("./../model/Note/NoteDTO");
class NoteService {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }
    saveNote() {
        let err = this.validateDataNote();
        if (err) {
            this.res.status(400).json(err);
            return;
        }
        let note = new Note_1.Note().convertPlainToObject(this.req.body);
        new NoteRepository_1.NoteRepository().save(note, ref => this.callBackSaveSuccess(), err => this.callBackErr(err));
    }
    findAllNotes() {
        new NoteRepository_1.NoteRepository().findAll(snapshot => this.callBackFindAllSuccess(snapshot), err => this.callBackErr(err));
    }
    findByTitle() {
        let title = this.req.params.title;
        new NoteRepository_1.NoteRepository().findByTitle(title, snapshot => this.callBackFindAllSuccess(snapshot), err => this.callBackErr(err));
    }
    validateDataNote() {
        this.req.assert("title", "O campo título é obrigatório").notEmpty();
        this.req
            .assert("description", "O campo descrição é obrigatório")
            .notEmpty();
        return this.req.validationErrors();
    }
    callBackSaveSuccess() {
        this.res.status(201).json({ message: "Nota criada com sucesso" });
    }
    callBackFindAllSuccess(snapshot) {
        let notesDTO = [];
        snapshot.forEach(doc => {
            let note = new Note_1.Note().convertPlainToObject(doc.data());
            let noteDTO = new NoteDTO_1.NoteDTO(doc.id, note);
            notesDTO.push(noteDTO);
        });
        this.res.json(notesDTO);
    }
    callBackErr(err) {
        this.res.status(500).json(err);
    }
}
exports.NoteService = NoteService;
//# sourceMappingURL=NoteService.js.map