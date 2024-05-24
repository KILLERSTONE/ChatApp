import http from 'http';
import initializeChatSocket from './chatSocket.js';

const server = http.createServer();
initializeChatSocket(server);

export default server;
