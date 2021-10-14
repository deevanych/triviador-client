<script lang="ts">
  import axiosInstance from '../plugins/axios'
  import { isLoaderShown, token } from '../store'
  import Button from '../components/@ui/Button.svelte';

  let loading = false

  const clickHandler = () => {
    loading = true
    isLoaderShown.update(() => true)
    axiosInstance.post('/login').then(({ data }) => {
      loading = false
      isLoaderShown.update(() => false)
      token.update(() => data.token)
    })
  }
</script>

<section class="login">
  <Button text="Залогиниться"
          { loading }
          on:click={ clickHandler }/>
</section>

<style lang="scss">
  :global(body) {
    background: rgba(10, 10, 10, .4);
  }

  .login {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    & :global(.button) {
      background: aqua;
    }
  }
</style>
