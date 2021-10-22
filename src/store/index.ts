import { writable } from 'svelte/store'
import type { UserInterface } from '../models/User';

export const defaultServerInfo = {
  playersCount: 0,
  lookingForGamePlayersCount: 0,
}

export const token = writable(localStorage.getItem('token') ?? '')
export const isOnline = writable(false)
export const serverInfo = writable(defaultServerInfo)
export const authUser = writable({} as UserInterface)
export const isLoading = writable(true)
export const isPopupShown = writable(false)

token.subscribe(value => {
  localStorage.setItem('token', value)
})

