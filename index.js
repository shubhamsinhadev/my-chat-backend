// server.js
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://my-chat-app-lemon-eight.vercel.app",
  },
});

app.use(
  cors({
    origin: "https://my-chat-app-lemon-eight.vercel.app",
  })
);


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://my-chat-app-lemon-eight.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get("/", (req, res) => {
  res.send('Hello World');
});

io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    console.log("A client disconnected.");
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
