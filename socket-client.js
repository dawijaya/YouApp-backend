const io = require('socket.io-client');

// Ganti dengan URL server Anda
const socket = io('http://localhost:8080', {
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.log('Connected to server:', socket.id);
});

socket.on('new_message', (data) => {
  console.log('New message received:', data);
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

// Simulasi pengiriman pesan
setTimeout(() => {
  console.log('Simulating a new message notification...');
  socket.emit('new_message', {
    senderId: '123',
    receiverId: '456',
    message: 'Hello from Socket.IO Client!',
    timestamp: new Date(),
  });
}, 3000);
