<script lang="ts">
  import { Router } from 'svelte-router-spa'
  import { routes } from './routes'
  import { isOnline } from './store'
  import Alert from './components/@ui/Alert.svelte'
  import toastr from 'toastr'

  let _isOnline = false

  isOnline.subscribe(value => {
    if (_isOnline !== value) {
      if (value) {
        toastr.success('Соединение установлено')
      } else {
        toastr.error('Соединение прервано')
      }

      _isOnline = value
    }
  })
</script>

<section class="layout">
  {#if !_isOnline}
  <div class="alert__wrapper">
    <Alert text="Нет подключения к серверу"/>
  </div>
  {/if}
  <div class="container">
    <Router { routes }/>
  </div>
</section>

<style lang="scss">
  :global(#app),
  :global(body),
  :global(html),
  .layout {
    height: 100%;
    padding: 0;
    margin: 0;
  }

  .layout {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .container {
    width: 70%;
    height: 80%;
  }

  .alert__wrapper {
    position: fixed;
    top: 1rem;
    left: 1rem;
    right: 1rem;
  }
</style>
