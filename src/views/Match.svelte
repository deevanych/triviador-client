<script lang="ts">
  import Map from '../components/Map.svelte'
  import { isLoading } from '../store'
  import socket from '../plugins/socket.io'

  isLoading.set(false)
  socket.emit('getMatchData')
</script>

<Map/>

<style lang="scss">

</style>
