<script lang="ts">
  import axiosInstance from '@/plugins/axios'
  import { token } from '@/store'
  import Button from '@/components/@ui/Button.svelte';
  import { serverInfo } from '../store';

  let isButtonLoading = false
  let _serverInfo = {}

  $: buttonText = !isButtonLoading ? 'Вход' : 'Авторизация ..'

  serverInfo.subscribe(data => _serverInfo = data)

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

<section class="login prose">
  <h1 class="site-title">Любовники</h1>
  <div class="shadow stats">
    <div class="stat">
      <div class="stat-title">Игроков онлайн</div>
      <div class="stat-value">
        <span class="countdown">
          <span style="--value:{ _serverInfo.playersCount };"></span>
        </span>
      </div>
      <div class="stat-desc">Ищут игру:
        <span class="countdown">
          <span style="--value:{ _serverInfo.lookingForGamePlayersCount };"></span>
        </span>
      </div>
    </div>
  </div>
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
    flex-direction: column;
    gap: 2rem;

    & :global(.button) {
      background: aqua;
    }
  }

  .prose {
    max-width: initial;
  }

  .site-title {
    margin-bottom: 0;
  }
</style>
