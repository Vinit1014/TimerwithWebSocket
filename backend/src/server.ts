import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins for simplicity
    methods: ['GET', 'POST'],
  },
});

let timerValue = 0;
let timerInterval: NodeJS.Timeout | null = null;

io.on('connection', (socket) => {
  console.log(`A user connected: ${socket.id}`);

  socket.emit('updateTimer', timerValue); // Send current timer value to the newly connected client

  socket.on('startTimer', () => {
    if (!timerInterval) {
      timerInterval = setInterval(() => {
        timerValue += 1;
        io.emit('updateTimer', timerValue); // Broadcast the updated timer value to all clients
      }, 1000);
    }
  });

  socket.on('stopTimer', () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  });

  socket.on('resetTimer', () => {
    timerValue = 0;
    io.emit('updateTimer', timerValue); // Broadcast the reset timer value to all clients
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
