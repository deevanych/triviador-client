import { writable } from 'svelte/store'

export const defaultServerInfo = {
  playersCount: 0,
  lookingForGamePlayersCount: 0,
}

export const token = writable(localStorage.getItem('token') ?? null)
export const isOnline = writable(false)
export const serverInfo = writable(defaultServerInfo)
// todo
export const authUser = writable({ id: null })

token.subscribe(value => {
  localStorage.setItem('token', value)
})

