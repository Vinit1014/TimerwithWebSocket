import React, { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:8000'; // Replace with your server URL
const socket: Socket = io(SOCKET_URL);

const TimerComponent: React.FC = () => {
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    socket.on('connect', () => {
      console.log(`Connected with socket ID: ${socket.id}`);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from socket');
    });

    socket.on('updateTimer', (newTime: number) => {
      setTime(newTime);
    });

    // Clean up the socket listeners on component unmount
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('updateTimer');
    };
  }, []);

  const startTimer = () => {
    socket.emit('startTimer');
  };

  const stopTimer = () => {
    socket.emit('stopTimer');
  };

  const resetTimer = () => {
    socket.emit('resetTimer');
  };

  return (
    <div>
      <h1>{time}s</h1>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default TimerComponent;
