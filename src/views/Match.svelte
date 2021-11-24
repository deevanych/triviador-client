<script lang="ts">
  import Map from '../components/Map.svelte'
  import { isLoading } from '../store'
  import socket from '../plugins/socket.io'
  import { onMount } from 'svelte'
  import { User } from '../models/User';
  import Disconnected from '../icons/Disconnected.svelte';
  import Castle from '../icons/Castle.svelte';
  import Land from '../icons/Land.svelte';

  let match
  let show = false
  let matchPlayers: User[] = []
  const playersColors = [
    'secondary',
    'accent',
    'error',
  ]

  const getUser = (userId: number): User | undefined => {
    return matchPlayers.find((player: User) => player.id === userId)
  }

  onMount(() => {
    socket.emit('getMatchData')

    socket.on('matchData', (data) => {
      console.log(data)
      match = data
      matchPlayers = data.users
      show = true
      isLoading.set(false)
    })

    socket.on('matchEvent', (data) => {
      switch (data.type) {
        case 'battleStarted':
          console.log(1, data)
          break

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
  {#each matchPlayers as player, index}
  <div class="player__item">
    <div class:avatar={ true }
         class:player__item_disconnected={ player.disconnected === true }
        >
      <div class={`ring-${playersColors[index]}`}
           class:player__avatar={ true }
           class:ring={ true }>
        <img src={ player.avatar_url } alt={ player.nickname }/>
      </div>
    </div>
    <div class:player__nickname={ true }
         class:player__item_disconnected={ player.disconnected === true }
         class={`ring-${playersColors[index]}`}>
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
  <Map/>
  <div class="match__turns">
    <div class="overflow-x-auto">
      <ul class="w-full steps">
        {#each match.stages as stage}
          <li class="step">
            <div class="avatar">
              <div class="mb-8 rounded-full bg-base-100 w-10 h-10 ring ring-primary ring-offset-base-100 ring-offset-2">
                {#if stage.type === 'initial'}
                  <Castle/>
                {:else if stage.type === 'defining'}
                  <Land/>
                {:else }
                  <img class="mask mask-squircle"
                       src={ getUser(stage.user_id).avatar_url }
                       alt={ getUser(stage.user_id).nickname}/>
                {/if}
              </div>
            </div>
          </li>
        {/each}
      </ul>
    </div>
  </div>
{/if}

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

  .step {
    .avatar {
      top: 0;
      position: absolute;
    }

    &::after {
      content: none !important;
    }
  }

  .player {
    &__avatar {
      border-radius: 50%;
      width: 3rem;
      height: 3rem;
    }

    &__list {
      display: flex;
      gap: 1rem;
      flex-direction: column;
      position: fixed;
      top: 2rem;
      left: 2rem;
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

  .match {
    &__turns {
      position: fixed;
      left: 2rem;
      right: 2rem;
      bottom: 2rem;
    }
  }
</style>
