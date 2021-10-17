<script lang="ts">
  import { authUser, isLoading, serverInfo, token } from '../store';
  import Button from '../components/@ui/Button.svelte';
  import socket from '../plugins/socket.io';
  import { onMount } from 'svelte';
  import { UsersAPI } from '../api/users';
  import { navigateTo } from 'svelte-router-spa';
  import { UserService } from '../services/UserService';
  import type { UserInterface } from '../models/User';
  import { AuthService } from '../services/AuthService';

  let loading = false

  onMount(() => {
    if ($token) {
      UsersAPI.getAuthUser().then(({ data }): void => {
        UserService.setAuthUser(data as UserInterface)
        isLoading.set(false)
      }).catch(() => {
        isLoading.set(true)
        AuthService.logout()
        navigateTo('/')
      })
    } else {
      isLoading.set(true)
      navigateTo('/')
    }
  })

  const clickHandler = () => {
    loading = true
    socket.emit('findGame')
  }
</script>

{#if $authUser}
  <section class="temp-section">
    <header>
      <div class="user__info flex items-center">
        <div class="avatar online">
          <div class="w-24 h-24 p-1 mask mask-squircle bg-primary">
            <img class="mask mask-squircle" src={ $authUser.avatar_url } alt={ $authUser.nickname }>
          </div>
        </div>
        <div class="user__data">
          <h1 class="user__nickname">{ $authUser.nickname }</h1>
          <div class="user__rating">Рейтинг: { $authUser.rating }</div>
        </div>
      </div>
    </header>
    <div class="temp">
      <span class="temp-text">Игроков ищут:
        <span class="countdown">
          <span style="--value:{ $serverInfo.lookingForGamePlayersCount };"></span>
        </span>
      </span>
      <Button text="Начать игру"
              on:click={ clickHandler }
              { loading }/>
    </div>
  </section>
{/if}

<style lang="scss">
  .temp {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    flex-grow: 1;

    &-text {
      margin-bottom: 1rem;
    }

    &-section {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }

  .user {
    &__info {
      gap: 1rem;
    }

    &__nickname {
      font-size: 2rem;
    }
  }
</style>
