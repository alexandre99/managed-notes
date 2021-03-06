import { Repository } from './Repository';
import { Note } from '../model/note/Note';
import { FirebaseDbHelper } from './../helper/FirebaseDbHelper';
import { NoteDTO } from '../model/note/NoteDTO';
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
      .orderBy('title')
      .startAt(title)
      .endAt(`${title}\uf8ff`)
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

  delete(id: string, callBackSuccess, callBackErr) {
    this.notesCollection
      .doc(id)
      .delete()
      .then(callBackSuccess)
      .catch(callBackErr);
  }
}
