<template>
  <div class="player-list">
    <div class="player" v-for="player in players">
      <bullet :score="player.yachtski" />
      <nuxt-link class="player-name" :to="{ path: `/personnel/${player.id}` }">{{ player.name }}</nuxt-link>
      <div class="player-roles">{{ player.roles }}</div>
    </div>
  </div>
</template>

<script>
  import Bullet from './Bullet'

  export default {
    props: {
      players: Array
    },
    components: {
      Bullet
    }
  }
</script>

<style>
  .player {
    display: grid;
    grid-template-columns: 20px 1fr 2fr;
    grid-gap: 20px;
    margin-bottom: 5px;
    border-bottom: 1px solid #dedede;
  }

  .player-roles {
    text-align: right;
  }
</style>
