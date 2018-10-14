import { Repository } from './Repository';
import { Note } from '../model/Note/Note';
import { FirebaseDbHelper } from './../helper/FirebaseDbHelper';
import { NoteDTO } from '../model/Note/NoteDTO';
export class NoteRepository implements Repository<Note, NoteDTO> {
  private notesCollection;
  constructor() {
    this.notesCollection = FirebaseDbHelper.getDb().collection('notes');
  }
  save(note: Note, callBackSuccess, callBackErr) {
    this.notesCollection
      .add(note.convertObjectToPlain())
      .then(callBackSuccess)
      .catch(callBackErr);
  }
  findAll(callBackSuccess: any, callBackErr) {
    this.notesCollection
      .get()
      .then(callBackSuccess)
      .catch(callBackErr);
  }

  findByTitle(title: string, callBackSuccess, callBackErr) {
    this.notesCollection
      .where('title', '==', title)
      .get()
      .then(callBackSuccess)
      .catch(callBackErr);
  }
  update(noteDTO: NoteDTO, callBackSuccess: any, callBackErr: any) {
    const note = noteDTO.note;
    this.notesCollection
      .doc(noteDTO.id)
      .update(note)
      .then(callBackSuccess)
      .catch(callBackErr);
  }
  findById(id: string, callBackSuccess: any, callBackErr: any) {
    this.notesCollection
      .doc(id)
      .get()
      .then(callBackSuccess)
      .catch(callBackErr);
  }
}
