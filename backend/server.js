import path from "path";
import dotenv from "dotenv";
<<<<<<< HEAD
import cors from "cors";
=======
>>>>>>> 6674c8e (project)
import { app, server } from "./socket/socket.js";
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
<<<<<<< HEAD
import connectToFirebase from "./db/firebase.js";
=======
import connectToMongoDB from "./db/connectToMongoDB.js";
>>>>>>> 6674c8e (project)

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

dotenv.config();

<<<<<<< HEAD
app.use(
  cors({
    origin: true,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Auth-Token"],
  })
);
=======
>>>>>>> 6674c8e (project)
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

<<<<<<< HEAD
server.listen(PORT, async () => {
  await connectToFirebase();
=======
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(
    "_________________________________________________________________________"
  );
>>>>>>> 6674c8e (project)
  console.log(`Server Running on port ${PORT}`);
});
