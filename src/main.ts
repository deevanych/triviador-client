import App from './App.svelte'
import './plugins/socket.io'

import './scss/main.scss'

const app = new App({
  target: document.getElementById('app')
})

export default app
