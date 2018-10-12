import app from './config/CustomExpress';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { FirebaseDbHelper } from './helper/FirebaseDbHelper';

admin.initializeApp(functions.config().firebase);
FirebaseDbHelper.inicializarCloudFirestore(admin);

export const webApi = functions.https.onRequest(app);
