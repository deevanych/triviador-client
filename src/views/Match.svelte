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
  const playersColors = [
    'secondary',
    'accent',
    'error',
  ]

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
{/if}
<Map/>
<div class="match__turns">
  <div class="overflow-x-auto">
    <ul class="w-full steps">
      <li class="step">start</li>
      <li class="step step-secondary">2</li>
      <li class="step step-secondary">3</li>
      <li class="step step-secondary">4</li>
      <li class="step">5</li>
      <li class="step step-accent">6</li>
      <li class="step step-accent">7</li>
      <li class="step">8</li>
      <li class="step step-error">9</li>
      <li class="step step-error">10</li>
      <li class="step">11</li>
      <li class="step">12</li>
      <li class="step step-warning">13</li>
      <li class="step step-warning">14</li>
      <li class="step">15</li>
      <li class="step step-neutral">16</li>
      <li class="step step-neutral">17</li>
      <li class="step step-neutral">18</li>
      <li class="step step-neutral">19</li>
      <li class="step step-neutral">20</li>
      <li class="step step-neutral">21</li>
      <li class="step step-neutral">22</li>
      <li class="step step-neutral">23</li>
      <li class="step step-neutral">end</li>
    </ul>
  </div>
</div>

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
    &__avatar {
      border-radius: 50%;
      width: 3rem;
      height: 3rem;
    }

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

  .match {
    &__turns {
      position: fixed;
      left: 2rem;
      bottom: 2rem;
    }
  }
</style>
