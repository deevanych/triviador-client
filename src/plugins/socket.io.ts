import { io } from 'socket.io-client/dist/socket.io.js';
import { isOnline } from '../store';

const COORDINATOR_URL = `${import.meta.env.VITE_BASE_URL}:${import.meta.env.VITE_COORDINATOR_PORT}`
export const socket = io(COORDINATOR_URL);

socket
  .on('connect', () => {
    isOnline.set(true)
  })
  .on('disconnect', () => {
    isOnline.set(false)
  })

export default socket
