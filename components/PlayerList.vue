<template>
  <div class="player-list">
    <div class="player" v-for="player in players">
      <bullet :score="player.yachtski" />
      <nuxt-link class="player-name" :to="{ path: `/personnel/${player.id}/${urlString(player.name)}` }">{{ player.name }}</nuxt-link>
      <div class="player-roles">{{ player.roles }}</div>
    </div>
  </div>
</template>

<script>
  import { utilities } from '../mixins/utilities'

  import Bullet from './Bullet'

  export default {
    props: {
      players: Array
    },
    components: {
      Bullet
    },
    mixins: [utilities]
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
