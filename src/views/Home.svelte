<script lang="ts">
    import MainMenuCard from '../components/MainMenuCard.svelte';
    import { socket } from '../plugins/socket.io';

    const clickHandler = () => {
        socket.emit('joinPlayersQueueRoom', {
            id: 1,
        });
    }
</script>

<section class="main-menu">
    <MainMenuCard on:click={ clickHandler } text="Рейтинговая игра"/>
    <MainMenuCard text="Лобби"/>
    <MainMenuCard text="Настройки"/>
</section>

<style lang="scss">
    .main-menu {
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 2rem;
      perspective: 1000px;
      transform-style: flat;
    }
</style>
