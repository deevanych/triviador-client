<script lang="ts">
  import Map from '../components/Map.svelte'
  import { isLoading } from '../store'
  import socket from '../plugins/socket.io'
  import { onMount } from 'svelte'

  let match
  let show = false

  onMount(() => {
    socket.emit('getMatchData')

    socket.on('matchData', (data) => {
      console.log(data)
      match = data
      show = true
      isLoading.set(false)
    })
  })
</script>

{#if show}
<div class="player__list">
  {#each match.getUsers as player}
  <div class="player__item">
    <div class="avatar player__avatar">
      <div class="rounded-full w-10 h-10">
        <img src={ player.avatar_url }>
      </div>
    </div>
    <div class="player__nickname">{ player.nickname }</div>
  </div>
  {/each}
</div>
{/if}
<Map/>

<style lang="scss">
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
    }
  }
</style>
