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
      err => this.callBackSaveErr(err)
    );
  }

  private validateDataNote() {
    this.req.assert('titulo', 'O campo título é obrigatório').notEmpty();
    this.req.assert('descricao', 'O campo descrição é obrigatório').notEmpty();
    return this.req.validationErrors();
  }

  private callBackSaveSuccess() {
    this.res.status(201).json({ message: 'Nota criada com sucesso' });
  }

  private callBackSaveErr(err) {
    this.res.status(500).json({ message: 'Erro ao criar nota', erro: err });
  }

  findAllNotes() {
    new NoteRepository().findAll(
      snapshot => this.callBackFindAllSuccess(snapshot),
      err => this.callBackFindAllError(err)
    );
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
  private callBackFindAllError(err) {
    this.res.status(500).json(err);
  }
}
