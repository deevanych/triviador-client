<script lang="ts">
    export let text!: string
    export let loading = false
    export let disabled = false
    export let alwaysEnabled = false
    export let squared = false
</script>

<div class="button__wrapper">
  <button on:click
          class="btn btn-lg glass"
          class:loading={ loading }
          class:btn_enabled={ alwaysEnabled }
          class:btn-square={ squared }
          { disabled }>
    <slot/>
  </button>
</div>

<style lang="scss">
    .button {
      $button: &;

      &__wrapper {
        & :global {
          .btn {
            &_enabled {
              pointer-events: all;
            }

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

