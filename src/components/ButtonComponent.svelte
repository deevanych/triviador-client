<script lang="ts">
    import { Button } from 'svelte-materialify';
    export let text!: string
    export let ripple = false;
</script>

<div class="button__wrapper">
    <Button on:click class="button" { ripple }>{ text }</Button>
</div>

<style lang="scss">
    .button {
      $button: &;

      &__wrapper {
        & :global(#{$button}) {
          background: red;
        }
      }
    }
</style>

