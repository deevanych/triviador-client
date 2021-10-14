<script lang="ts">
    export let text!: string
</script>

<div class="button__wrapper">
  <button on:click class="btn btn-lg glass">{ text }</button>
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

