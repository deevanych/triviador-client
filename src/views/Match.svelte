<script lang="ts">

</script>

<section class="map">
    <div class="map__territory"></div>
    <div class="map__territory"></div>
    <div class="map__territory"></div>
    <div class="map__territory"></div>
    <div class="map__territory"></div>
    <div class="map__territory"></div>
    <div class="map__territory"></div>
    <div class="map__territory"></div>
    <div class="map__territory"></div>
    <div class="map__territory"></div>
    <div class="map__territory"></div>
    <div class="map__territory"></div>
    <div class="map__territory"></div>
    <div class="map__territory"></div>
    <div class="map__territory"></div>
</section>

<style lang="scss">
    .map {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;

      &__territory {
        width: 100px;
        height: 100px;
        background: tomato;
        opacity: 0.3;
      }
    }
</style>
