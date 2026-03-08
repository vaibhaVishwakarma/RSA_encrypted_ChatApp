import admin from "firebase-admin";

let db = null;

const connectToFirebase = async () => {
  try {
    if (admin.apps.length > 0) {
      db = admin.firestore();
      console.log("Using existing Firebase connection");
      return db;
    }

    let credential;
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      credential = admin.credential.cert(
        JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
      );
    } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      credential = admin.credential.applicationDefault();
    } else {
      throw new Error(
        "Firebase credentials not found. Set FIREBASE_SERVICE_ACCOUNT or GOOGLE_APPLICATION_CREDENTIALS."
      );
    }

    admin.initializeApp({ credential });

    db = admin.firestore();
    console.log("Connected to Firebase Firestore");
    return db;
  } catch (error) {
    console.log("Error connecting to Firebase:", error.message);
    throw error;
  }
};

export const getDb = () => db;
export default connectToFirebase;
