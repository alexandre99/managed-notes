import { Repository } from './Repository';
import { Note } from '../model/Note/Note';
import { FirebaseDbHelper } from './../helper/FirebaseDbHelper';
export class NoteRepository implements Repository<Note> {
  private notesCollection;
  constructor() {
    this.notesCollection = FirebaseDbHelper.getDb().collection('notes');
  }
  save(note: Note, callbackSuccess: any, callbackError: any) {
    this.notesCollection
      .add(note.convertObjectToPlain())
      .then(callbackSuccess)
      .catch(callbackError);
  }
  findAll(callbackSuccess: any, callbackError: any) {
    this.notesCollection
      .get()
      .then(callbackSuccess)
      .catch(callbackError);
  }
}
