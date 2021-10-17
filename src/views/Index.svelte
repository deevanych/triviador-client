<script lang="ts">
  import axiosInstance from '../plugins/axios'
  import { authUser, defaultServerInfo, isOnline, token } from '../store'
  import Button from '../components/@ui/Button.svelte';
  import { serverInfo } from '../store';
  import { UsersAPI } from '../api/users';
  import { navigateTo } from 'svelte-router-spa';

  let isButtonLoading = false
  let _serverInfo = defaultServerInfo
  let _isOnline = false

  $: buttonText = !isButtonLoading ? 'Вход' : 'Авторизация ..'

  serverInfo.subscribe(value => _serverInfo = value)
  isOnline.subscribe(value => _isOnline = value)

  const clickHandler = () => {
    isButtonLoading = true
    axiosInstance.post('/login')
      .then(({ data }) => {
        token.subscribe(value => {
          localStorage.setItem('token', value)
        })
        token.set(data.token)
        UsersAPI.getAuthUser().then(({ data }) => {
          console.log(data)
          authUser.set(data)
        })
        navigateTo('home')
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
          disabled={ !_isOnline }
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
