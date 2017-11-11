<template>
  <div class="player-list">
    <div class="player" v-for="player in players">
      <div class="bullet">
        <svg height="20" width="20">
          <rect width="20" height="20" :style="{ fill: getColor(player.yachtski) }" />
        </svg>
      </div>
      <div class="player-name">{{ player.name }}</div>
      <div class="player-roles">{{ player.roles }}</div>
    </div>
  </div>
</template>

<script>
  import { jayGradient } from '../mixins/gradient'

  export default {
    props: {
      players: Array
    },
    mixins: [jayGradient]
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
