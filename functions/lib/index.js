"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomExpress_1 = require("./config/CustomExpress");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
exports.webApi = functions.https.onRequest(CustomExpress_1.default);
//# sourceMappingURL=index.js.map