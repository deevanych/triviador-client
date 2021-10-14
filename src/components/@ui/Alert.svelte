<script lang="ts">
  import Disallow from '@/icons/Disallow.svelte'
  export let text!: string
</script>

<div class="alert alert-error">
  <div class="flex-1">
    <Disallow/>
    <label>{ text }</label>
  </div>
</div>

<style lang="scss">

</style>
