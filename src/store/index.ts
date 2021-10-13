import { writable } from 'svelte/store'

export const isLoaderShown = writable(false)
export const token = writable(localStorage.getItem('token') ?? null)

isLoaderShown.subscribe((value) => value)
token.subscribe(value => {
  localStorage.setItem('token', value)
})

