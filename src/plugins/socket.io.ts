import { io } from 'socket.io-client/dist/socket.io.js';
import { defaultServerInfo, isOnline, serverInfo, token, authUser } from '../store';

let _token: string | null = null
// todo
let _authUser!: { id: number }

token.subscribe((value => _token = value))
authUser.subscribe((value => {
  _authUser = value
}))

const getUserId = () => _authUser.id

const COORDINATOR_URL = `${import.meta.env.VITE_BASE_URL}:${import.meta.env.VITE_COORDINATOR_PORT}`
export const socket = io(COORDINATOR_URL, {
  extraHeaders: {
    userId: getUserId(),
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

export default socket
