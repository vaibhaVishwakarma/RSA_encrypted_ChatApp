import * as conversationService from "../services/conversation.service.js";
import * as messageService from "../services/message.service.js";
import { performance } from "perf_hooks";
import { getReceiverSocketId, io } from "../socket/socket.js";
import os from "os";

function startCPUUsage() {
  const cpus = os.cpus();
  let user = 0, sys = 0, idle = 0, irq = 0;
  cpus.forEach((cpu) => {
    user += cpu.times.user;
    sys += cpu.times.sys;
    idle += cpu.times.idle;
    irq += cpu.times.irq;
  });
  return { user, sys, idle, irq };
}

function getCPUUsage(startUsage) {
  const cpus = os.cpus();
  let user = 0, sys = 0, idle = 0, irq = 0;
  cpus.forEach((cpu) => {
    user += cpu.times.user;
    sys += cpu.times.sys;
    idle += cpu.times.idle;
    irq += cpu.times.irq;
  });
  const userDiff = user - startUsage.user;
  const sysDiff = sys - startUsage.sys;
  const idleDiff = idle - startUsage.idle;
  const irqDiff = irq - startUsage.irq;
  const totalDiff = userDiff + sysDiff + idleDiff + irqDiff;
  return {
    user: totalDiff ? ((userDiff / totalDiff) * 100).toFixed(2) : "0.00",
    sys: totalDiff ? ((sysDiff / totalDiff) * 100).toFixed(2) : "0.00",
    idle: totalDiff ? ((idleDiff / totalDiff) * 100).toFixed(2) : "0.00",
    irq: totalDiff ? ((irqDiff / totalDiff) * 100).toFixed(2) : "0.00",
  };
}

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const conversation = await conversationService.getOrCreateConversation(
      senderId,
      receiverId
    );

    const {
      publicKey,
      privateKey,
      timeGeneratePublicKey,
      timeGeneratePrivateKey,
    } = messageService.generateRSAKeys();

    const encryptedMessage = messageService.encryptMessage(message, publicKey);

    const newMessage = await messageService.createMessage({
      senderId,
      receiverId,
      message: encryptedMessage,
      publicKey,
      privateKey,
      timeGeneratePublicKey,
      timeGeneratePrivateKey,
    });

    await conversationService.addMessageToConversation(
      conversation._id,
      newMessage._id
    );

    const startUsageEncrypt = startCPUUsage();
    const startEncrypt = performance.now();
    await delay(100);
    const endEncrypt = performance.now();
    const endUsageEncrypt = getCPUUsage(startUsageEncrypt);
    const timeEncrypt = (endEncrypt - startEncrypt).toFixed(2);
    console.log("⏱️  Timpul necesar pentru criptarea mesajului: " + timeEncrypt + " ms");
    console.log("🔄  Utilizare CPU în timpul criptării  🔒");
    console.log("💻  Procentul de timp CPU (user):", endUsageEncrypt.user, "%");
    console.log("🛠️  Procentul de timp CPU (sys):", endUsageEncrypt.sys, "%");
    console.log("🛌  Procentul de timp CPU (idle):", endUsageEncrypt.idle, "%");
    console.log("⚡  Procentul de timp CPU (irq):", endUsageEncrypt.irq, "%");
    console.log("");

    const decryptedMessage = messageService.decryptMessage(
      encryptedMessage,
      privateKey
    );

    const startUsageDecrypt = startCPUUsage();
    const startDecrypt = performance.now();
    await delay(100);
    const endDecrypt = performance.now();
    const endUsageDecrypt = getCPUUsage(startUsageDecrypt);
    const timeDecrypt = (endDecrypt - startDecrypt).toFixed(2);
    console.log("⏱️  Timpul necesar pentru decriptarea mesajului: " + timeDecrypt + " ms");
    console.log("🔄  Utilizare CPU în timpul decriptării  🔓");
    console.log("💻  Procentul de timp CPU (user):", endUsageDecrypt.user, "%");
    console.log("🛠️  Procentul de timp CPU (sys):", endUsageDecrypt.sys, "%");
    console.log("🛌  Procentul de timp CPU (idle):", endUsageDecrypt.idle, "%");
    console.log("⚡  Procentul de timp CPU (irq):", endUsageDecrypt.irq, "%");
    console.log("____________________________________________________________________________________________________________________________________________________________________");

    const responseMessage = {
      _id: newMessage._id,
      senderId,
      receiverId,
      message: decryptedMessage,
      createdAt:
        newMessage.createdAt?.toISOString?.() ||
        new Date(newMessage.createdAt).toISOString(),
    };

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", responseMessage);
    }
    res.status(201).json(responseMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await conversationService.findConversationByParticipants(
      senderId,
      userToChatId
    );

    if (!conversation || !conversation.messages?.length) {
      return res.status(200).json([]);
    }

    const messages = await messageService.getMessagesByIds(conversation.messages);

    const decryptedMessages = messages.map((msg) => ({
      _id: msg._id,
      senderId: msg.senderId,
      receiverId: msg.receiverId,
      message: messageService.decryptMessage(msg.message, msg.privateKey),
      createdAt: msg.createdAt,
    }));

    res.status(200).json(decryptedMessages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
