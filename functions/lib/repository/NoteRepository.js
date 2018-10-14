"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FirebaseDbHelper_1 = require("./../helper/FirebaseDbHelper");
class NoteRepository {
    constructor() {
        this.notesCollection = FirebaseDbHelper_1.FirebaseDbHelper.getDb().collection('notes');
    }
    save(note, callBackSuccess, callBackErr) {
        this.notesCollection
            .add(note.convertObjectToPlain())
            .then(callBackSuccess)
            .catch(callBackErr);
    }
    findAll(callBackSuccess, callBackErr) {
        this.notesCollection
            .get()
            .then(callBackSuccess)
            .catch(callBackErr);
    }
    findByTitle(title, callBackSuccess, callBackErr) {
        this.notesCollection
            .where('title', '==', title)
            .get()
            .then(callBackSuccess)
            .catch(callBackErr);
    }
}
exports.NoteRepository = NoteRepository;
//# sourceMappingURL=NoteRepository.js.map