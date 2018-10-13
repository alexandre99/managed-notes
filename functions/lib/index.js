"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomExpress_1 = require("./config/CustomExpress");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const FirebaseDbHelper_1 = require("./helper/FirebaseDbHelper");
admin.initializeApp(functions.config().firebase);
FirebaseDbHelper_1.FirebaseDbHelper.inicializarCloudFirestore(admin);
exports.webApi = functions.https.onRequest(CustomExpress_1.default);
//# sourceMappingURL=index.js.map