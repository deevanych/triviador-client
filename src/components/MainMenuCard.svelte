<script lang="ts">
    export let text!: string
    const halfWidth = innerWidth / 2;
    const halfHeight = innerHeight / 2;
    const zDistance = 10;
    let xCoff = 0;
    let yCoff = 0;
    let targetX = 0;

    const mousemoveHandler = ({ pageX, pageY }) => {
        xCoff = ((pageX || targetX) - halfWidth) / halfWidth;
        yCoff = (halfHeight - (pageY || this.targetY)) / halfHeight;
    }

    $: computedStyle = `transform: translateZ(${zDistance}px) rotateX(${10 * yCoff}deg) rotateY(${10 * xCoff}deg)`;
</script>

<section class="card-menu"
         on:click
         style={ computedStyle }
         on:mousemove={ mousemoveHandler }>
    <div class="card-menu__meta">
        <span>Игроков в поиске: 17</span>
        <span>Время в очереди: 17 сек</span>
    </div>
    <h2 class="card-menu__title">{ text }</h2>
</section>

<style lang="scss">
    .card-menu {
      flex-grow: 1;
      flex-basis: 200px;
      height: 100%;
      transform: rotateX(10deg);
      position: relative;
      transform-style: preserve-3d;
      transition: 0.3s;
      box-shadow: 3px 4px 9px 0 #e2e2e2;
      border-radius: 3px;

      &:hover {
        transition: 0s;
      }

      &__meta {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        font-family: "Segoe UI Semibold", sans-serif;
      }

      &__title {
        box-shadow: 3px 4px 9px 0 #e2e2e2;
        background: #232323;
        color: #fff;
        font-family: "Segoe UI Semibold", sans-serif;
        padding: 10px;
        text-transform: uppercase;
        bottom: 20px;
        position: absolute;
        left: -10px;
        transform: translateZ(100px);
      }
    }
</style>
