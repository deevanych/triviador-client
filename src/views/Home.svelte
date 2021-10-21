<script lang="ts">
  import { authUser, isLoading, serverInfo, token } from '../store'
  import Button from '../components/@ui/Button.svelte'
  import socket from '../plugins/socket.io'
  import { onMount } from 'svelte'
  import { UsersAPI } from '../api/users'
  import { navigateTo } from 'svelte-router-spa'
  import type { UserInterface } from '../models/User'
  import { AuthService } from '../services/AuthService'
  import Cross from '../icons/Cross.svelte'

  let loading = false
  $: searchButtonText = !loading ? 'Начать игру' : 'Идет поиск соперников'

  onMount(() => {
    if ($token) {
      UsersAPI.getAuthUser().then(({ data }): void => {
        AuthService.login(data as UserInterface)
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

  const findGame = () => {
    loading = true
    socket.emit('findGame')
  }

  const stopFindGame = () => {
    loading = false
    socket.emit('stopFindGame')
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
      <div class="search-buttons">
        <Button on:click={ findGame }
                { loading }>
          { searchButtonText }
        </Button>
        { #if loading }
        <Button squared={ true }
                background="error"
                on:click={ stopFindGame }>
          <Cross/>
        </Button>
        {/if}
      </div>
    </div>
  </section>
{/if}

<style lang="scss">
  .search-buttons {
    display: flex;
    gap: 1rem;
  }

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
