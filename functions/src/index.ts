import app from './config/CustomExpress';
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp(functions.config().firebase);
export const webApi = functions.https.onRequest(app);
