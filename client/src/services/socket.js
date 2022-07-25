import { io } from "socket.io-client";

export const socketChat = io('http://localhost:3000/socket/chat', {
  autoConnect: false,
  reconnection: false,
  rejectUnauthorized: true
})