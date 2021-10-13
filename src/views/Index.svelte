<script lang="ts">
  import axiosInstance from '../plugins/axios';
  import ButtonComponent from '../components/ButtonComponent.svelte';
  import { isLoaderShown } from '../store';

  const clickHandler = () => {
    isLoaderShown.update(() => true);
    axiosInstance.post('/login').then(({ data }) => {
      isLoaderShown.update(() => false);
      console.log(data)
    })
  }
</script>

<section class="login">
  <ButtonComponent class="button" text="Залогиниться" on:click={ clickHandler }/>
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
