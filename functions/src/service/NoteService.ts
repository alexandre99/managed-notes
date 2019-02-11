import { Note } from '../model/note/Note';
import { NoteRepository } from '../repository/NoteRepository';
import { Response, Request } from 'express';
import { NoteDTO } from './../model/note/NoteDTO';
import { Service } from './Service';
export class NoteService implements Service<Note, NoteDTO> {

  constructor(private req: Request, private resp: Response) { }

  save() {
    const args = [
      { field: 'title', message: 'O campo título é obrigatório' },
      { field: 'description', message: 'O campo descrição é obrigatório' }
    ];
    let err = this.validateData(args);
    if (err) {
      this.resp.status(400).json(err);
      return;
    }
    let note = new Note().convertPlainToObject(this.req.body);
    new NoteRepository().save(
      note,
      ref => this.callBackSuccess('Nota criada com sucesso', 201),
      err => this.callBackErr(err)
    );
  }

  update() {
    const args = [
      { field: 'note.title', message: 'O campo título é obrigatório' },
      { field: 'note.description', message: 'O campo descrição é obrigatório' },
      { field: 'id', message: 'O campo id é obrigatório' }
    ];
    let err = this.validateData(args);
    if (err) {
      this.resp.status(400).json(err);
      return;
    }
    let noteDTO = new NoteDTO().convertPlainToObject(this.req.body);
    new NoteRepository().update(
      noteDTO,
      () => this.callBackSuccess('Nota atualizada com sucesso'),
      err => this.callBackErr(err)
    );
  }

  findAll() {
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

  findById() {
    let id: string = this.req.params.id;
    new NoteRepository().findById(
      id,
      doc => this.callBackFindByIdSuccess(doc),
      err => this.callBackErr(err)
    );
  }

  delete() {
    let id: string = this.req.params.id;
    new NoteRepository().delete(
      id,
      () => this.callBackSuccess('Nota removida com sucesso'),
      err => this.callBackErr(err)
    );
  }

  callBackFindByIdSuccess(doc) {
    let note = new Note().convertPlainToObject(doc.data());
    let noteDTO = new NoteDTO(doc.id, note);
    this.resp.json(noteDTO);
  }

  validateData(args: any[]) {
    args.forEach(arg => this.req.assert(arg.field, arg.message).notEmpty());
    return this.req.validationErrors();
  }

  callBackSuccess(msg: string, status: number = 200) {
    this.resp.status(status).json({ message: msg });
  }

  callBackFindAllSuccess(snapshot) {
    let notesDTO: NoteDTO[] = [];
    snapshot.forEach(doc => {
      let note = new Note().convertPlainToObject(doc.data());
      let noteDTO = new NoteDTO(doc.id, note);
      notesDTO.push(noteDTO);
    });
    this.resp.json(notesDTO);
  }

  callBackErr(err) {
    this.resp.status(500).json(err);
  }
}
