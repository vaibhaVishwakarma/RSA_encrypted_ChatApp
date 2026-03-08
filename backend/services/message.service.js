import NodeRSA from "node-rsa";
import { performance } from "perf_hooks";
import forge from "node-forge";
import { getDb } from "../db/firebase.js";

const COLLECTION = "messages";

function measureMemoryUsage() {
  const used = process.memoryUsage();
  console.log(
    `🧠  Memorie fizică [resident set size (RSS)]: ${(
      used.rss /
      1024 /
      1024
    ).toFixed(2)} MB`
  );
  console.log(
    `🧠  Memorie totală alocată pentru heap: ${(
      used.heapTotal /
      1024 /
      1024
    ).toFixed(2)} MB`
  );
  console.log(
    `🧠  Memorie utilizată din heap: ${(used.heapUsed / 1024 / 1024).toFixed(
      2
    )} MB`
  );
}

export const generateRSAKeys = () => {
  const key = new NodeRSA({ b: 2048 });

  const startTimeGeneratePublicKey = performance.now();
  const publicKey = key.exportKey("public");
  const endTimeGeneratePublicKey = performance.now();
  const timeGeneratePublicKey = (
    endTimeGeneratePublicKey - startTimeGeneratePublicKey
  ).toFixed(2);

  const startTimeGeneratePrivateKey = performance.now();
  const privateKey = key.exportKey("private");
  const endTimeGeneratePrivateKey = performance.now();
  const timeGeneratePrivateKey = (
    endTimeGeneratePrivateKey - startTimeGeneratePrivateKey
  ).toFixed(2);

  return {
    publicKey,
    privateKey,
    timeGeneratePublicKey,
    timeGeneratePrivateKey,
  };
};

export const encryptMessage = (message, publicKey) => {
  console.log(
    "____________________________________________________________________________________________________________________________________________________________________"
  );
  console.log("🔒  Rivest-Shamir-Adleman 2048 [RSA-2048]  🔒");
  console.log("");
  console.log("");
  console.log("📊  Măsurare resurse înainte de criptare  🔒");
  measureMemoryUsage();
  console.log("");
  if (message) {
    const originalMessageLength = message.length;
    const originalSize = Buffer.byteLength(message, "utf8");
    const key = new NodeRSA(publicKey);
    const encrypted = key.encrypt(message, "base64");
    console.log("📏  Lungimea mesajului original: " + originalMessageLength + " caractere");
    console.log("📐  Dimensiunea mesajului original: " + originalSize + " bytes");
    console.log("📏  Lungimea mesajului criptat: " + encrypted.length + " caractere");
    console.log("");
    console.log("📊  Măsurare resurse după criptare  🔒");
    measureMemoryUsage();
    console.log("");
    return encrypted;
  }
  return message;
};

export const decryptMessage = (encryptedMessage, privateKey) => {
  if (encryptedMessage) {
    console.log("📊  Măsurare resurse înainte de decriptare  🔓");
    measureMemoryUsage();
    console.log("");
    const key = new NodeRSA(privateKey);
    const decrypted = key.decrypt(encryptedMessage, "utf8");
    console.log("📊  Măsurare resurse după decriptare  🔓");
    measureMemoryUsage();
    console.log("📏  Lungimea mesajului decriptat: " + decrypted.length + " caractere");
    console.log("");
    return decrypted;
  }
  return encryptedMessage;
};

export const createMessage = async (messageData) => {
  const db = getDb();
  const docRef = db.collection(COLLECTION).doc();
  const message = {
    ...messageData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  await docRef.set(message);
  return { _id: docRef.id, ...message };
};

export const toSerializable = (obj) => {
  if (!obj) return obj;
  const converted = { ...obj };
  if (obj.createdAt?.toDate) {
    converted.createdAt = obj.createdAt.toDate().toISOString();
  }
  if (obj.updatedAt?.toDate) {
    converted.updatedAt = obj.updatedAt.toDate().toISOString();
  }
  return converted;
};

export const getMessagesByIds = async (messageIds) => {
  if (!messageIds || messageIds.length === 0) return [];
  const db = getDb();
  const messages = [];
  for (const id of messageIds) {
    const doc = await db.collection(COLLECTION).doc(id).get();
    if (doc.exists) {
      const data = doc.data();
      messages.push(toSerializable({ _id: doc.id, ...data }));
    }
  }
  messages.sort((a, b) => {
    const aTime = new Date(a.createdAt).getTime();
    const bTime = new Date(b.createdAt).getTime();
    return aTime - bTime;
  });
  return messages;
};
