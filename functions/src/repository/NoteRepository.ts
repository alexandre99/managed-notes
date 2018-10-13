import { Repository } from './Repository';
import { Note } from '../model/Note/Note';
import { FirebaseDbHelper } from './../helper/FirebaseDbHelper';
export class NoteRepository implements Repository<Note> {
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
}
