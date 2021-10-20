<script lang="ts">
  import axiosInstance from '../plugins/axios'
  import { serverInfo, isOnline, token, isLoading } from '../store'
  import { navigateTo } from 'svelte-router-spa';

  import Button from '../components/@ui/Button.svelte';
  import { onMount } from 'svelte';
  import { UsersAPI } from '../api/users';
  import { UserService } from '../services/UserService';
  import type { UserInterface } from '../models/User';
  import { AuthService, TokenInterface } from '../services/AuthService';

  let isButtonLoading = false
  let isButtonDisabled = true

  $: buttonText = !isButtonLoading ? 'Вход' : 'Авторизация ..'

  onMount(() => {
    isLoading.set(true)
    if ($token) {
      navigateTo('home')
    } else {
      isLoading.set(false)
      isButtonDisabled = false
    }
  })

  const clickHandler = () => {
    isLoading.set(true)
    isButtonLoading = true
    axiosInstance.post('/login')
      .then(({ data }): void => {
        AuthService.setToken((data as TokenInterface).token)
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
          <span style="--value:{ $serverInfo.playersCount };"></span>
        </span>
      </div>
      <div class="stat-desc">Ищут игру:
        <span class="countdown">
          <span style="--value:{ $serverInfo.lookingForGamePlayersCount };"></span>
        </span>
      </div>
    </div>
  </div>
  <Button text={ buttonText }
          loading={ isButtonLoading }
          disabled={ !$isOnline || isButtonDisabled }
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
