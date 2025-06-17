import admin from "firebase-admin"
import {readFileSync} from "fs"

const serviceAccount = JSON.parse(
    readFileSync(new URL("../mini-blog-9c73e-firebase-adminsdk-fbsvc-e38046d1ae.json", import.meta.url))
)

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;