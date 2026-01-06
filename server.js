import express from "express";
import http from "http";
import { WebSocketServer } from "ws";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.static("public"));

wss.on("connection", socket => {
  socket.on("message", msg => {
    // 모든 클라이언트에게 신호 전달
    wss.clients.forEach(client => {
      if (client !== socket && client.readyState === 1) {
        client.send(msg.toString());
      }
    });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server running on", PORT);
});