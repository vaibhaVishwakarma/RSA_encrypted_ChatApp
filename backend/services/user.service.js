import { getDb } from "../db/firebase.js";

const COLLECTION = "users";

export const findUserByUsername = async (username) => {
  const db = getDb();
  const snapshot = await db
    .collection(COLLECTION)
    .where("username", "==", username)
    .limit(1)
    .get();

  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { _id: doc.id, ...doc.data() };
};

export const findUserById = async (userId) => {
  const db = getDb();
  const doc = await db.collection(COLLECTION).doc(userId).get();
  if (!doc.exists) return null;
  return { _id: doc.id, ...doc.data() };
};

export const createUser = async (userData) => {
  const db = getDb();
  const docRef = db.collection(COLLECTION).doc();
  const user = {
    ...userData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  await docRef.set(user);
  return { _id: docRef.id, ...user };
};

export const getAllUsersExcept = async (excludeUserId) => {
  const db = getDb();
  const snapshot = await db.collection(COLLECTION).get();
  const users = [];
  snapshot.forEach((doc) => {
    if (doc.id !== excludeUserId) {
      const data = doc.data();
      const { password, ...userWithoutPassword } = data;
      users.push({ _id: doc.id, ...userWithoutPassword });
    }
  });
  return users;
};
