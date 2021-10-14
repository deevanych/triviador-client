<script lang="ts">
  import axiosInstance from '@/plugins/axios'
  import { token } from '@/store'
  import Button from '@/components/@ui/Button.svelte';

  let isButtonLoading = false

  $: buttonText = !isButtonLoading ? 'Вход' : 'Авторизация ..'

  const clickHandler = () => {
    isButtonLoading = true
    axiosInstance.post('/login')
      .then(({ data }) => {
        token.set(data.token)
      })
      .finally(() => {
        isButtonLoading = false
      })
  }
</script>

<section class="login">
  <Button text={ buttonText }
          loading={ isButtonLoading }
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
