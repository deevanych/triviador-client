<script lang="ts">
  import { Router } from 'svelte-router-spa';
  import { routes } from './routes';

  import './scss/main.scss'
</script>

<section class="layout">
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
</style>
