"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FirebaseDbHelper {
    static inicializarCloudFirestore(admin) {
        this.db = admin.firestore();
    }
    static getDb() {
        return this.db;
    }
}
exports.FirebaseDbHelper = FirebaseDbHelper;
//# sourceMappingURL=FirebaseDbHelper.js.map