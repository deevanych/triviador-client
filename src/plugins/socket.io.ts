import { io } from 'socket.io-client/dist/socket.io.js';
import type { SocketOptions } from 'socket.io-client';

const COORDINATOR_URL = `${import.meta.env.VITE_BASE_URL}:${import.meta.env.VITE_COORDINATOR_PORT}`

export const socket: SocketOptions = io(COORDINATOR_URL);
