<script lang="ts">
  import axiosInstance from '../plugins/axios'
  import ButtonComponent from '../components/ButtonComponent.svelte'
  import { isLoaderShown, token } from '../store'

  export let params = undefined
  export let currentRoute = undefined

  const clickHandler = () => {
    isLoaderShown.update(() => true)
    axiosInstance.post('/login').then(({ data }) => {
      isLoaderShown.update(() => false)
      token.update(() => data.token)
    })
  }
</script>

<section class="login">
  <ButtonComponent text="Залогиниться"
                   ripple={ true }
                   on:click={ clickHandler }/>
</section>

<style lang="scss">
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
