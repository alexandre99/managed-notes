"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
class Note {
    constructor(titulo, descricao) {
        this.titulo = titulo;
        this.descricao = descricao;
    }
    convertPlainToObject(plain) {
        return class_transformer_1.plainToClass(Note, plain);
    }
    convertObjectToPlain(value) {
        return class_transformer_1.classToPlain(value);
    }
    getTitulo() {
        return this.titulo;
    }
}
exports.Note = Note;
//# sourceMappingURL=Note.js.map