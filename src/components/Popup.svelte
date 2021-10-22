<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import socket from '../plugins/socket.io'

  const dispatch = createEventDispatcher()
  const clickHandler = () => {
    dispatch('goToMatch')
  }
  const cancelClickHandler = () => {
    socket.emit('leaveMatch')
  }
</script>

<section>
  <input type="checkbox"
         id="asdddsa"
         checked
         class="modal-toggle">
  <div class="modal">
    <div class="modal-box">
      <p>Сейчас вы в игре. Переподключиться к матчу?</p>
      <div class="modal-action">
        <label for="asdddsa" on:click={ clickHandler } class="btn btn-primary">Подключиться</label>
        <label for="asdddsa" on:click={ cancelClickHandler } class="btn">Отмена</label>
      </div>
    </div>
  </div>
</section>

<style lang="scss">

</style>
