# Module 2: Messaging, Encryption, and Realtime Delivery

## Why this module exists
This module answers: **how messages are created, stored, encrypted/decrypted, and delivered instantly.**

## Main files in this module
- [`backend/controllers/message.controller.js`](backend/controllers/message.controller.js)
- [`backend/routes/message.routes.js`](backend/routes/message.routes.js)
- [`backend/socket/socket.js`](backend/socket/socket.js)
- [`backend/models/message.model.js`](backend/models/message.model.js)
- [`frontend/src/context/SocketContext.jsx`](frontend/src/context/SocketContext.jsx)
- [`frontend/src/hooks/useSendMessage.js`](frontend/src/hooks/useSendMessage.js)
- [`frontend/src/hooks/useGetMessages.js`](frontend/src/hooks/useGetMessages.js)
- [`frontend/src/hooks/useListenMessages.js`](frontend/src/hooks/useListenMessages.js)
- [`frontend/src/zustand/useConversation.js`](frontend/src/zustand/useConversation.js)

## Basic workflow (step-by-step)
1. Sender types message and clicks send.
2. Frontend posts message to `/api/messages/send/:id`.
3. Backend encrypts message and stores it with conversation linkage.
4. Backend emits `newMessage` event through Socket.IO to receiver socket.
5. Receiver client listens to `newMessage` and appends it to local message state.
6. If user reloads or opens chat later, frontend fetches message history via `getMessages`.

## How this works technically (simple terms)
- **REST API** does reliable write-to-database.
- **Socket.IO** does instant push update.
- **Zustand store** acts like local memory for selected conversation + message list.
- Encryption functions protect message content during storage/processing flow.

## Inputs and outputs
- Input: sender id, receiver id, plaintext message
- Output: stored encrypted message + realtime event + rendered decrypted text in UI

## Why both API and socket are used
- API ensures data is persisted (source of truth).
- Socket ensures low-latency user experience (instant delivery feel).

## Common failure points
- Socket connected to wrong origin/URL
- Receiver not subscribed/listening correctly
- State update uses stale array instead of functional updater
- CORS mismatch for websocket connection

## Counter questions (for viva/discussion)
1. Why not use only REST polling instead of sockets?
2. Why can realtime fail even when DB writes are successful?
3. What is the difference between message persistence and message broadcast?
4. How does functional state update prevent lost messages?
5. Where should decryption happen: backend, frontend, or both?

## Counter questions: detailed answers
### 1) Why not use only REST polling instead of sockets?
Polling checks repeatedly for new data, which increases network traffic and introduces delay between send and receive.  
Sockets keep one persistent connection and push events immediately, which gives real-time user experience and lower redundant traffic.

### 2) Why can realtime fail even when DB writes are successful?
Because write and realtime are two separate paths:
- API path: save message to DB
- Socket path: emit to connected receiver
If socket origin/CORS/listener/connection is wrong, the DB write succeeds but receiver UI does not update until refresh fetches history.

### 3) What is the difference between message persistence and message broadcast?
- Persistence = durable storage (source of truth)
- Broadcast = live event transport to active clients
Both are required for a reliable chat system: persistence for correctness, broadcast for instant UX.

### 4) How does functional state update prevent lost messages?
Using `setMessages([...messages, msg])` can lose messages when state is stale inside closures.  
Using `setMessages((prev) => [...prev, msg])` always appends to the latest state snapshot, which prevents race-condition message loss during rapid updates.

### 5) Where should decryption happen: backend, frontend, or both?
It depends on security target:
- Backend decrypt: simpler client, but server can read plaintext
- Frontend decrypt (true E2E style): stronger privacy, harder key management
- Hybrid: easier migration path
For strict end-to-end confidentiality, private keys should remain client-side.

## Conclusive summary
This module is the core of chat reliability. API guarantees data durability, while sockets guarantee immediacy. Most real-time bugs happen at integration boundaries (socket URL, CORS, state update patterns), not in basic CRUD logic.

