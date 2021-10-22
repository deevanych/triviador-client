<script lang="ts">
  import { authUser, isLoading, serverInfo, token, isOnline } from '../store'
  import Button from '../components/@ui/Button.svelte'
  import socket from '../plugins/socket.io'
  import { onMount } from 'svelte'
  import { UsersAPI } from '../api/users'
  import { navigateTo } from 'svelte-router-spa'
  import type { UserInterface } from '../models/User'
  import { AuthService } from '../services/AuthService'
  import Cross from '../icons/Cross.svelte'
  import dayjs from 'dayjs';
  import duration from 'dayjs/plugin/duration'

  dayjs.extend(duration)

  let gameIsSearched = false
  let timer
  let searchTime = '00:00'
  $: searchButtonText = !gameIsSearched ? 'Начать игру' : `Идет поиск соперников (${searchTime})`

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

    isOnline.subscribe((value => {
        if (!value)
          stopSearchingGame()
      })
    )
  })

  socket.on('gameSearchStarted', () => {
    startSearchingGame()
  }).on('gameSearchStopped', () => {
    stopSearchingGame()
  })

  const startGameSearch = () => {
    socket.emit('startGameSearch')
  }

  const stopGameSearch = () => {
    socket.emit('stopGameSearch')
  }

  const startSearchingGame = () => {
    const now = dayjs()
    timer = setInterval(() => {
      searchTime = dayjs.duration(dayjs().diff(now)).format('mm:ss')
    }, 1000)
    gameIsSearched = true
  }

  export const stopSearchingGame = () => {
    clearTimeout(timer)
    searchTime = '00:00'
    gameIsSearched = false
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
        <Button on:click={ startGameSearch }
                disabled={ !$isOnline }
                loading={ gameIsSearched }>
          { searchButtonText }
        </Button>
        { #if gameIsSearched }
        <Button squared={ true }
                background="error"
                on:click={ stopGameSearch }>
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
      flex-grow: 1;
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
