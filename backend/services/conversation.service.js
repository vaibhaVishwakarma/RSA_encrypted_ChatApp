import admin from "firebase-admin";
import { getDb } from "../db/firebase.js";

const COLLECTION = "conversations";

const sortParticipants = (a, b) => (a < b ? `${a}_${b}` : `${b}_${a}`);

export const findConversationByParticipants = async (participant1, participant2) => {
  const db = getDb();
  const participantsKey = sortParticipants(participant1, participant2);
  const snapshot = await db
    .collection(COLLECTION)
    .where("participantsKey", "==", participantsKey)
    .limit(1)
    .get();

  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { _id: doc.id, ...doc.data() };
};

export const createConversation = async (participant1, participant2) => {
  const db = getDb();
  const docRef = db.collection(COLLECTION).doc();
  const participantsKey = sortParticipants(participant1, participant2);
  const conversation = {
    participants: [participant1, participant2],
    participantsKey,
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  await docRef.set(conversation);
  return { _id: docRef.id, ...conversation };
};

export const addMessageToConversation = async (conversationId, messageId) => {
  const db = getDb();
  const docRef = db.collection(COLLECTION).doc(conversationId);
  await docRef.update({
    messages: admin.firestore.FieldValue.arrayUnion(messageId),
    updatedAt: new Date(),
  });
};

export const getOrCreateConversation = async (participant1, participant2) => {
  let conversation = await findConversationByParticipants(
    participant1,
    participant2
  );
  if (!conversation) {
    conversation = await createConversation(participant1, participant2);
  }
  return conversation;
};
