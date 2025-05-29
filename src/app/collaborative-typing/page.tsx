"use client";

import { useEffect, useRef, useState } from "react";

// Define the WebSocket Message Types
interface TextUpdateMessage {
  type: "TEXT_UPDATE";
  payload: string;
}

export default function CollaborativeTypingPage() {
  const [text, setText] = useState<string>("");
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const wsProtocol = location.protocol === "https:" ? "wss" : "ws";
    const wsHost = location.hostname;
    const ws = new WebSocket(`${wsProtocol}://${wsHost}:3001`);
    // const ws = new WebSocket(`https://a68c-2405-201-4030-a8c9-dd77-6e24-ac94-c457.ngrok-free.app`);

    ws.onopen = () => {
      console.log("Connected to WebSocket server ✅");
    };

    ws.onmessage = (event: MessageEvent<string>) => {
      try {
        const message: TextUpdateMessage = JSON.parse(event.data);

        if (message.type === "TEXT_UPDATE") {
          setText(message.payload);
        }
      } catch (error) {
        console.error("Invalid message format:", error);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket closed ❌");
    };

    socketRef.current = ws;

    return () => {
      ws.close();
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);

    const message: TextUpdateMessage = {
      type: "TEXT_UPDATE",
      payload: value,
    };

    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Collaborative Typing 📝</h1>
      <textarea
        value={text}
        onChange={handleChange}
        className="border border-gray-400 rounded-md p-2 w-96 h-40"
        placeholder="Type here..."
      />
    </div>
  );
}

// npm run dev -- --hostname 0.0.0.0