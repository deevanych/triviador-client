<script lang="ts">
  import { navigateTo, Router } from 'svelte-router-spa'
  import { routes } from './routes'
  import { isLoading, isOnline, isPopupShown } from './store'
  import Alert from './components/@ui/Alert.svelte'
  import toastr from 'toastr'
  import Loader from './components/Loader.svelte'
  import { debounce } from 'lodash';
  import Popup from './components/Popup.svelte';

  let _isOnline = false
  let _isLoading = true
  let _isPopupShown = false

  isPopupShown.subscribe((value) => _isPopupShown = value)
  isLoading.subscribe((value) => _isLoading = value)

  const popupHandler = () => {
    navigateTo('/match')
  }

  const debounced = debounce((value) => {
      if (_isOnline !== value) {
        if (value) {
          toastr.success('Соединение установлено')
        } else {
          toastr.error('Соединение прервано')
        }

        _isOnline = value
      }
    }, 1000) as (value: boolean) => {}

  isOnline.subscribe(value => debounced(value))
</script>

{#if _isLoading}
  <Loader/>
{/if}
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
{#if _isPopupShown}
<Popup on:goToMatch={ popupHandler }/>
{/if}

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
    display: flex;
  }

  .alert__wrapper {
    position: fixed;
    top: 1rem;
    left: 1rem;
    right: 1rem;
  }
</style>
