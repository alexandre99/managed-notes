import { Model } from '../Model';
import { plainToClass, classToPlain } from 'class-transformer';
import { Note } from './Note';
export class NoteDTO implements Model<NoteDTO> {
  constructor(public id?: string, public note?: Note) {}

  convertPlainToObject(plain: any): NoteDTO {
    return plainToClass(NoteDTO, plain as Object);
  }
  convertObjectToPlain() {
    return classToPlain(this);
  }
}
