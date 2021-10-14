<script lang="ts">
    export let text!: string
    export let loading = false
</script>

<div class="button__wrapper">
  <button on:click
          class="btn btn-lg glass"
          class:loading={ loading }>{ text }</button>
</div>

<style lang="scss">
    .button {
      $button: &;

      &__wrapper {
        & :global {
          .btn {
            &.loading {
              &::before {
                margin-right: 1.5rem;
              }
            }
          }
        }
      }
    }
</style>

