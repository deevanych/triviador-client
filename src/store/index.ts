import { writable } from 'svelte/store'

export const token = writable(localStorage.getItem('token') ?? null)

token.subscribe(value => {
  localStorage.setItem('token', value)
})

