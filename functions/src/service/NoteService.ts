import { Note } from '../model/Note/Note';
import { NoteRepository } from '../repository/NoteRepository';
import { Response, Request } from 'express';
import { NoteDTO } from './../model/Note/NoteDTO';
export class NoteService {
  constructor(private req: Request, private res: Response) {}

  saveNote() {
    let err = this.validateDataNote();
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

  private validateDataNote() {
    this.req.assert('title', 'O campo título é obrigatório').notEmpty();
    this.req
      .assert('description', 'O campo descrição é obrigatório')
      .notEmpty();
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
