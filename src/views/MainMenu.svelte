<script lang="ts">
  import axiosInstance from '../plugins/axios';
  import ButtonComponent from '../components/ButtonComponent.svelte';

  const clickHandler = () => {
    axiosInstance.post('/login').then(({ data }) => {
      console.log(data)
    })
  }
</script>

<section class="main-menu">
  <ButtonComponent text="213" on:click={ clickHandler }/>
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
