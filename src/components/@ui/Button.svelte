<script lang="ts">
    export let loading = false
    export let disabled = false
    export let alwaysEnabled = false
    export let squared = false
    export let background = ''
</script>

<div class="button__wrapper {background !== '' ? `bg-${background}` : ''}"
     class:button__wrapper_squared={ squared }>
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
        &_squared {
          border-radius: var(--rounded-btn, .5rem);
        }

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

