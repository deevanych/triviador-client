import { io } from 'socket.io-client/dist/socket.io.js';
import { authUser, defaultServerInfo, isOnline, isPopupShown, serverInfo } from '../store';
import { navigateTo } from 'svelte-router-spa';
import type { User } from '../models/User';

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
  .on('goToActiveMatch', () => {
    isPopupShown.set(true)
  })
  .on('userUpdate', (user: User) => {
    authUser.set(user)
  })

socket.emit('getMatchData')

export default socket
