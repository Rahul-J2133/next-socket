import { WebSocketServer, WebSocket } from "ws";

// Create server
const wss = new WebSocketServer({host: "0.0.0.0", port: 3001});

// Track all connected clients
const clients = new Set<WebSocket>();

// Define the exact structure of the message
interface TextUpdateMessage {
  type: "TEXT_UPDATE";
  payload: string;
}

wss.on("connection", (ws: WebSocket) => {
  clients.add(ws);
  console.log("Client connected. Total clients:", clients.size);

  ws.on("message", (data: WebSocket.RawData) => {
    try {
      const message = JSON.parse(data.toString()) as TextUpdateMessage;

      if (message.type === "TEXT_UPDATE") {
        // Broadcast to all clients
        for (const client of clients) {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
          }
        }
      }
    } catch (error) {
      console.error("Invalid message received:", error);
    }
  });

  ws.on("close", () => {
    clients.delete(ws);
    console.log("Client disconnected. Total clients:", clients.size);
  });
});

console.log("✅ WebSocket server running on ws://localhost:3001");

