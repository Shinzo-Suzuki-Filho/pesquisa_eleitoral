import { io } from 'socket.io-client';

// Substitua pelo IP da sua máquina se for rodar no celular físico
const SOCKET_URL = 'http://localhost:3000'; // ou http://192.168.x.x:3000

const socket = io(SOCKET_URL);

export default socket;
