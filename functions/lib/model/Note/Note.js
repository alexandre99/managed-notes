"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
class Note {
    constructor(title, description) {
        this.title = title;
        this.description = description;
    }
    convertPlainToObject(plain) {
        return class_transformer_1.plainToClass(Note, plain);
    }
    convertObjectToPlain() {
        return class_transformer_1.classToPlain(this);
    }
}
exports.Note = Note;
//# sourceMappingURL=Note.js.map