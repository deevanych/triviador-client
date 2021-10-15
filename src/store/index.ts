import { writable } from 'svelte/store'

export const token = writable(localStorage.getItem('token') ?? null)
export const isOnline = writable(false)
export const serverInfo = writable({
  playersCount: 0,
  lookingForGamePlayersCount: 0,
})

token.subscribe(value => {
  localStorage.setItem('token', value)
})

