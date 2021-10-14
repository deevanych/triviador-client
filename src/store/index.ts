import { writable } from 'svelte/store'

export const token = writable(localStorage.getItem('token') ?? null)
export const isOnline = writable(false)

token.subscribe(value => {
  localStorage.setItem('token', value)
})

