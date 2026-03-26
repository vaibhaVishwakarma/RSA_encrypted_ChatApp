import mongoose from "mongoose";
import NodeRSA from "node-rsa";
<<<<<<< HEAD
import { performance } from "perf_hooks";
import forge from "node-forge";
=======
>>>>>>> 6674c8e (project)

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    publicKey: {
      type: String,
      required: true,
    },
    privateKey: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

<<<<<<< HEAD
// Funcție pentru măsurarea memoriei
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

// Funcție pentru generarea cheilor RSA
messageSchema.statics.generateRSAKeys = function () {
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

// Metoda de criptare
messageSchema.methods.encryptMessage = function () {
  console.log(
    "____________________________________________________________________________________________________________________________________________________________________"
  );
  console.log("🔒  Rivest-Shamir-Adleman 2048 [RSA-2048]  🔒");
  console.log("");
  console.log("");
  // Măsurare resurse înainte de criptare
  console.log("📊  Măsurare resurse înainte de criptare  🔒");
  measureMemoryUsage();
  console.log("");
  if (this.message) {
    // Măsurare lungimea mesajului original (numărul de caractere)
    const originalMessageLength = this.message.length;
    // Măsurare dimensiunea mesajului original (numărul de bytes)
    const originalSize = Buffer.byteLength(this.message, "utf8");
    const key = new NodeRSA(this.publicKey);
    const encrypted = key.encrypt(this.message, "base64");
    this.message = encrypted;
    // Măsurare lungimea mesajului criptat (numărul de caractere)
    const encryptedMessageLength = this.message.length;
    // Calculare lungimea cheilor în biți
    // Decodează cheile din PEM
    const publicKeyPEM = forge.pki.publicKeyFromPem(this.publicKey);
    const privateKeyPEM = forge.pki.privateKeyFromPem(this.privateKey);
    // Obține lungimea cheilor în biți
    const publicKeyLengthBits = publicKeyPEM.n.bitLength();
    const privateKeyLengthBits = privateKeyPEM.n.bitLength();

    console.log("🔑  Cheia de criptare publică: ", this.publicKey);
    console.log("🔑  Cheia de criptare privată: ", this.privateKey);
    console.log(
      "📐  Dimensiunea cheii publice de criptare: " +
        publicKeyLengthBits +
        " biți"
    );
    console.log(
      "📐  Dimensiunea cheii private de criptare: " +
        privateKeyLengthBits +
        " biți"
    );
    console.log(
      "⏱️  Timpul necesar pentru generarea cheii publice: " +
        this.timeGeneratePublicKey +
        " ms"
    );
    console.log(
      "⏱️  Timpul necesar pentru generarea cheii private: " +
        this.timeGeneratePrivateKey +
        " ms"
    );
    console.log("");
    console.log(
      "📏  Lungimea mesajului original: " + originalMessageLength + " caractere"
    );
    console.log(
      "📐  Dimensiunea mesajului original: " + originalSize + " bytes"
    );
    console.log("");
    // console.log("🔒  Mesajul criptat: ", this.message);
    console.log(
      "📏  Lungimea mesajului criptat: " + encryptedMessageLength + " caractere"
    );
    console.log("");
    // Măsurare resurse după criptare
    console.log("📊  Măsurare resurse după criptare  🔒");
    measureMemoryUsage();
    console.log("");
  }
};

// Metoda de decriptare
messageSchema.methods.decryptMessage = function () {
  if (this.message) {
    // Măsurare resurse înainte de decriptare
    console.log("📊  Măsurare resurse înainte de decriptare  🔓");
    measureMemoryUsage();
    console.log("");
    const key = new NodeRSA(this.privateKey);
    const decrypted = key.decrypt(this.message, "utf8");
    this.message = decrypted;
    const decryptedMessageLength = this.message.length;
    // Măsurare resurse după decriptare
    console.log("📊  Măsurare resurse după decriptare  🔓");
    measureMemoryUsage();
    console.log("");
    console.log(
      "📏  Lungimea mesajului decriptat: " +
        decryptedMessageLength +
        " caractere"
    );
    console.log("");
=======
// Funcție pentru generarea unei noi perechi de chei RSA
messageSchema.statics.generateRSAKeys = function () {
  // Lungimea cheii RSA este 2048 de biți
  const key = new NodeRSA({ b: 2048 });
  const publicKey = key.exportKey("public");
  const privateKey = key.exportKey("private");
  return { publicKey, privateKey };
};

// Metodele de criptare și decriptare
messageSchema.methods.encryptMessage = function () {
  if (this.message) {
    const key = new NodeRSA(this.publicKey);
    const encrypted = key.encrypt(this.message, "base64");
    this.message = encrypted;
    console.log(
      "_________________________________________________________________________"
    );
    console.log(this.publicKey);
    console.log(this.privateKey);
    console.log("Mesajul criptat este -> ", this.message);
  }
};

messageSchema.methods.decryptMessage = function () {
  if (this.message) {
    const key = new NodeRSA(this.privateKey);
    const decrypted = key.decrypt(this.message, "utf8");
    this.message = decrypted;
>>>>>>> 6674c8e (project)
  }
};

const Message = mongoose.model("Message", messageSchema);

export default Message;
