import { Model } from "./Model";
import { plainToClass, classToPlain } from "class-transformer";

export class Note implements Model<Note>{
  constructor(private titulo?: string, private descricao?: string) { }

  convertPlainToObject(plain: any): Note {
    return plainToClass(Note, plain as Object);
  }
  convertObjectToPlain(value: Note) {
    return classToPlain(value);
  }

  getTitulo(): string {
    return this.titulo;
  }

}
