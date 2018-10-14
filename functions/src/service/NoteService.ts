import { Note } from '../model/Note/Note';
import { NoteRepository } from '../repository/NoteRepository';
import { Response, Request } from 'express';
import { NoteDTO } from './../model/Note/NoteDTO';
export class NoteService {
  constructor(private req: Request, private res: Response) {}
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
    let note = new Note().convertPlainToObject(this.req.body);
    new NoteRepository().save(
      note,
      ref => this.callBackSaveSuccess(),
      err => this.callBackErr(err)
    );
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
    let noteDTO = new NoteDTO().convertPlainToObject(this.req.body);
    new NoteRepository().update(
      noteDTO,
      ref => this.callBackUpdateSuccess(),
      err => this.callBackErr(err)
    );
  }

  private callBackUpdateSuccess() {
    this.res.json({ message: 'Nota atualizada com sucesso' });
  }

  findAllNotes() {
    new NoteRepository().findAll(
      snapshot => this.callBackFindAllSuccess(snapshot),
      err => this.callBackErr(err)
    );
  }

  findByTitle() {
    let title: string = this.req.params.title;
    new NoteRepository().findByTitle(
      title,
      snapshot => this.callBackFindAllSuccess(snapshot),
      err => this.callBackErr(err)
    );
  }

  private validateDataNote(args: any[]) {
    args.forEach(arg => this.req.assert(arg.field, arg.message).notEmpty());
    return this.req.validationErrors();
  }

  private callBackSaveSuccess() {
    this.res.status(201).json({ message: 'Nota criada com sucesso' });
  }

  private callBackFindAllSuccess(snapshot) {
    let notesDTO: NoteDTO[] = [];
    snapshot.forEach(doc => {
      let note = new Note().convertPlainToObject(doc.data());
      let noteDTO = new NoteDTO(doc.id, note);
      notesDTO.push(noteDTO);
    });
    this.res.json(notesDTO);
  }

  private callBackErr(err) {
    this.res.status(500).json(err);
  }
}
