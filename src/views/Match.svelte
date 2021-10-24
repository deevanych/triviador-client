<script lang="ts">
  import Map from '../components/Map.svelte'
  import { isLoading } from '../store'
  import socket from '../plugins/socket.io'
  import { onMount } from 'svelte'
  import { User } from '../models/User';
  import Disconnected from '../icons/Disconnected.svelte';

  let match
  let show = false
  let matchPlayers: User[] = []

  onMount(() => {
    socket.emit('getMatchData')

    socket.on('matchData', (data) => {
      match = data
      matchPlayers = data.getUsers
      show = true
      isLoading.set(false)
    })

    socket.on('matchEvent', (data) => {
      switch (data.type) {
        case 'userDisconnected':
          matchPlayers.map((player) => {
            if (data.userId === player.id) {
              player.disconnected = true
            }
          })

          matchPlayers = matchPlayers
          break

        case 'userConnected':
          matchPlayers.map((player) => {
            if (data.userId === player.id) {
              player.disconnected = false
            }
          })

          matchPlayers = matchPlayers
          break
      }
    })
  })
</script>

{#if show}
<div class="player__list">
  {#each matchPlayers as player}
  <div class="player__item">
    <div class="avatar player__avatar" class:player__item_disconnected={ player.disconnected === true }>
      <div class="rounded-full w-10 h-10">
        <img src={ player.avatar_url } alt={ player.nickname }/>
      </div>
    </div>
    <div class="player__nickname" class:player__item_disconnected={ player.disconnected === true }>
      { player.nickname }
    </div>
    {#if player.disconnected }
      <div class="player__icon player__icon_disconnected">
        <Disconnected/>
      </div>
    {/if}
  </div>
  {/each}
</div>
{/if}
<Map/>

<style lang="scss">
  @keyframes blink {
    from {
      opacity: 0;
    }

    50% {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  .player {
    &__list {
      display: flex;
      gap: 1rem;
      flex-direction: column;
      position: absolute;
    }

    &__item {
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: 0.3s;

      &_disconnected {
        opacity: 0.3;
      }
    }

    &__icon {
      width: 1rem;
      height: 1rem;
      animation: blink 2s infinite;
    }
  }
</style>
