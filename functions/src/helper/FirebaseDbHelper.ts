export class FirebaseDbHelper {
  private static db: any;

  static inicializarCloudFirestore(admin: any) {
    this.db = admin.firestore();
  }

  static getDb() {
    return this.db;
  }
}
