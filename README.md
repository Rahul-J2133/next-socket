# next-socket

A real-time **collaborative typing** app built with Next.js 15 and a standalone WebSocket server. Any text typed in the textarea is instantly broadcast to all connected clients — open it in multiple browser tabs or devices on the same network to see live synchronization.

---

## How It Works

- The **Next.js frontend** (`/collaborative-typing`) connects to a WebSocket server on port `3001`.
- On each keystroke, the client sends a `TEXT_UPDATE` message to the server.
- The **WebSocket server** broadcasts every received message to all connected clients.
- All clients update their textarea in real time.

---

## Project Structure

```
next-socket/
├── src/
│   └── app/
│       ├── page.tsx                     # Redirects to /collaborative-typing
│       └── collaborative-typing/
│           └── page.tsx                 # Main collaborative typing UI
├── server/
│   ├── server.ts                        # Standalone WebSocket server (port 3001)
│   ├── package.json
│   └── tsconfig.json
├── next.config.ts                       # Next.js config (allowed dev origins)
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### 1. Install frontend dependencies

```bash
npm install
```

### 2. Install server dependencies

```bash
cd server
npm install
cd ..
```

### 3. Start the WebSocket server

```bash
cd server
npm run dev
```

The WebSocket server will start on `ws://localhost:3001`.

### 4. Start the Next.js frontend

In a separate terminal, from the project root:

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000), which redirects to `/collaborative-typing`.

---

## Using on a Local Network (Multiple Devices)

To test across devices on the same Wi-Fi network:

1. Start Next.js with network access enabled:

```bash
npm run dev -- --hostname 0.0.0.0
```

2. Update `next.config.ts` to include your machine's local IP in `allowedDevOrigins`:

```ts
experimental: {
  allowedDevOrigins: ['http://192.168.x.x:3000'],
},
```

3. Open `http://<your-local-ip>:3000` on any device on the same network.

---

<img src="next-socket-demo.gif" style="width:100%; max-width:900px; height:auto;">

## Tech Stack

| Layer     | Technology              |
|-----------|-------------------------|
| Frontend  | Next.js 15, React 19    |
| Styling   | Tailwind CSS v4         |
| WebSocket | `ws` v8 (Node.js)       |
| Language  | TypeScript              |

---

## Scripts

### Frontend (`/`)

| Command         | Description              |
|-----------------|--------------------------|
| `npm run dev`   | Start Next.js dev server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

### WebSocket Server (`/server`)

| Command         | Description                        |
|-----------------|------------------------------------|
| `npm run dev`   | Run server with `ts-node`          |
| `npm run build` | Compile TypeScript to `dist/`      |
| `npm run start` | Run compiled server from `dist/`   |
