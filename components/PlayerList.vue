<template>
  <div class="player-list">
    <div class="player" v-for="player in players">
      <div class="player-bullet">
        <bullet :score="player.yachtski" />
        <nuxt-link class="player-links" :to="{ path: `${player.resource_url}/${urlString(player.name)}` }">{{ player.name }}</nuxt-link>
      </div>
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
    grid-template-columns: 1fr 2fr;
    margin-bottom: 5px;
    padding-bottom: 5px;
    border-bottom: 1px solid #dedede;
  }

  .player-bullet {
    display: grid;
    grid-template-columns: 20px 1fr;
    grid-gap: 10px;
  }

  .player-roles {
    text-align: right;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    .player {
      grid-template-columns: 1fr;
    }

    .player-links {
      font-size: 14px;
    }

    .player-roles {
      margin: 0 0 0 35px;
      font-size: 12px;
      text-align: left;
    }
  }

  @media (max-width: 425px) {
    .player-bullet {
      grid-gap: 5px;
    }

    .player-roles {
      margin: 0 0 5px 30px;
    }
  }
</style>
