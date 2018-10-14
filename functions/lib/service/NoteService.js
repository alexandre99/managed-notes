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
        const args = [
            { field: 'title', message: 'O campo título é obrigatório' },
            { field: 'description', message: 'O campo descrição é obrigatório' }
        ];
        let err = this.validateDataNote(args);
        if (err) {
            this.res.status(400).json(err);
            return;
        }
        let note = new Note_1.Note().convertPlainToObject(this.req.body);
        new NoteRepository_1.NoteRepository().save(note, ref => this.callBackSaveSuccess(), err => this.callBackErr(err));
    }
    updateNote() {
        const args = [
            { field: 'note.title', message: 'O campo título é obrigatório' },
            { field: 'note.description', message: 'O campo descrição é obrigatório' },
            { field: 'id', message: 'O campo id é obrigatório' }
        ];
        let err = this.validateDataNote(args);
        if (err) {
            this.res.status(400).json(err);
            return;
        }
        let noteDTO = new NoteDTO_1.NoteDTO().convertPlainToObject(this.req.body);
        new NoteRepository_1.NoteRepository().update(noteDTO, ref => this.callBackUpdateSuccess(), err => this.callBackErr(err));
    }
    callBackUpdateSuccess() {
        this.res.json({ message: 'Nota atualizada com sucesso' });
    }
    findAllNotes() {
        new NoteRepository_1.NoteRepository().findAll(snapshot => this.callBackFindAllSuccess(snapshot), err => this.callBackErr(err));
    }
    findByTitle() {
        let title = this.req.params.title;
        new NoteRepository_1.NoteRepository().findByTitle(title, snapshot => this.callBackFindAllSuccess(snapshot), err => this.callBackErr(err));
    }
    findById() {
        let id = this.req.params.id;
        new NoteRepository_1.NoteRepository().findById(id, doc => this.callBackFindByIdSuccess(doc), err => this.callBackErr(err));
    }
    callBackFindByIdSuccess(doc) {
        let note = new Note_1.Note().convertPlainToObject(doc.data());
        let noteDTO = new NoteDTO_1.NoteDTO(doc.id, note);
        this.res.json(noteDTO);
    }
    validateDataNote(args) {
        args.forEach(arg => this.req.assert(arg.field, arg.message).notEmpty());
        return this.req.validationErrors();
    }
    callBackSaveSuccess() {
        this.res.status(201).json({ message: 'Nota criada com sucesso' });
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