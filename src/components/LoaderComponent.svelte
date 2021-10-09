<script lang="ts">
    import { isLoaderShown } from '../store';

    export let text!: string

    const clickHandler = () => {
        isLoaderShown.update((isLoaderShown) => !isLoaderShown);
    }
</script>

<div class="loader" on:click={ clickHandler }>
    <span class="loader__text">{ text }</span>
</div>

<style lang="scss">
    .loader {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-image: url('./loader.gif');
      background-repeat: no-repeat;
      background-position: center;
      background-color: rgba(255, 255, 255, 0.9);
      display: flex;
      justify-content: center;

      &__text {
        position: absolute;
        bottom: 40%;
      }
    }
</style>
