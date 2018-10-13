"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
class NoteDTO {
    constructor(id, note) {
        this.id = id;
        this.note = note;
    }
    convertPlainToObject(plain) {
        return class_transformer_1.plainToClass(NoteDTO, plain);
    }
    convertObjectToPlain() {
        return class_transformer_1.classToPlain(this);
    }
}
exports.NoteDTO = NoteDTO;
//# sourceMappingURL=NoteDTO.js.map