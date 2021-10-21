import { io } from 'socket.io-client/dist/socket.io.js';
import { defaultServerInfo, isOnline, serverInfo } from '../store';
import { navigateTo } from 'svelte-router-spa';

const COORDINATOR_URL = `${import.meta.env.VITE_BASE_URL}:${import.meta.env.VITE_COORDINATOR_PORT}`
export const socket = io(COORDINATOR_URL, {
  auth: {
    token: null,
  },
});

socket
  .on('connect', () => {
    isOnline.set(true)
  })
  .on('disconnect', () => {
    isOnline.set(false)
    serverInfo.set(defaultServerInfo)
  })
  .on('serverInfo', (data) => {
    serverInfo.set(data)
  })
  .on('gameCopyAlreadyOpen', () => {
    navigateTo('bye-bye')
  })
  .on('startGame', () => {
    navigateTo('match')
  })
  .on('userNotFound', () => {
    navigateTo('/')
  })
  .on('goToLobby', () => {
    navigateTo('/')
  })

socket.emit('getMatchData')

export default socket
