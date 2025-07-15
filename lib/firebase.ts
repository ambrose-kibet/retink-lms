//  Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import admin from "firebase-admin";
import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  createHash,
} from "crypto";

interface FirebaseAdminAppParams {
  projectId: string;
  clientEmail: string;
  storageBucket: string;
  privateKey: string;
}

export async function createFirebaseAdminApp(params: FirebaseAdminAppParams) {
  if (admin.apps.length > 0) return admin.app();

  const encryptedBase64 = process.env.ENCRYPTED_FIREBASE_CREDENTIALS;
  const passphrase = process.env.FIREBASE_SECRET_KEY;

  if (!encryptedBase64 || !passphrase) {
    throw new Error(
      "Missing ENCRYPTED_FIREBASE_CREDENTIALS or FIREBASE_SECRET_KEY"
    );
  }

  const encryptedBuffer = Buffer.from(encryptedBase64, "base64");
  const iv = encryptedBuffer.slice(0, 16);
  const encryptedText = encryptedBuffer.slice(16);
  const key = createHash("sha256").update(passphrase).digest();

  try {
    const decipher = createDecipheriv("aes-256-cbc", key, iv);
    const decrypted = Buffer.concat([
      decipher.update(encryptedText),
      decipher.final(),
    ]);

    const serviceAccount = JSON.parse(decrypted.toString("utf8"));
    const cert = admin.credential.cert(serviceAccount);

    return admin.initializeApp({
      credential: cert,
      projectId: serviceAccount.project_id,
      storageBucket: serviceAccount.storage_bucket || params.storageBucket,
    });
  } catch (err: any) {
    throw new Error("Decryption failed: " + err.message);
  }
}

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};
export async function initAdmin() {
  const params = {
    projectId: process.env.FIREBASE_PROJECT_ID as string,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
    storageBucket: "retink-31633.appspot.com",
    privateKey: process.env.FIREBASE_PRIVATE_KEY as string,
  };

  if (!admin.apps.length) {
    await createFirebaseAdminApp(params); // <- now async
  }

  return admin.app();
}
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
