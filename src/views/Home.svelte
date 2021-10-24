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

  const logout = () => {
    AuthService.logout()
    navigateTo('/')
  }
</script>

{#if $authUser}
  <section class="temp-section">
    <header>
      <div class="stat bg-transparent">
        <div class="stat-figure text-info">
          <div class="avatar online">
            <div class="w-16 h-16 p-1 mask mask-squircle bg-base-100">
              <img src={ $authUser.avatar_url } alt={ $authUser.nickname } class="mask mask-squircle"/>
            </div>
          </div>
        </div>
        <div class="stat-value">{ $authUser.nickname }</div>
        <div class="stat-title">Рейтинг: { $authUser.rating }</div>
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
        { #if !gameIsSearched }
        <Button on:click={ logout }>
          Выйти из аккаунта
        </Button>
        {/if}
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
</style>
