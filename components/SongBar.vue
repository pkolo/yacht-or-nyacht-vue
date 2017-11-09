<template>
  <div class="song-bar" :style="{ background: backgroundColor }">
    <div>{{ song.yachtski }}</div>
    <div>
      <span v-html="this.$options.filters.artistURL(song.artists)"></span> - {{ song.title }} ({{ song.year }})
    </div>
    <div>{{ song.scores.jd }}</div>
    <div>{{ song.scores.hunter }}</div>
    <div>{{ song.scores.steve }}</div>
    <div>{{ song.scores.dave }}</div>
    <div>{{ song.episode.number }}</div>
  </div>
</template>

<script>
  import { jayGradient } from '../mixins/gradient'

  export default {
    data () {
      return {
        backgroundColor: this.getColor(this.song.yachtski)
      }
    },
    props: {
      song: Object
    },
    filters: {
      artistURL: function (artists) {
        return artists.map(a => `<a href=${a.url}>${a.name}</a>`).join(', ')
      }
    },
    mixins: [jayGradient]
  }
</script>

<style>
  .song-bar {
    display: grid;
    grid-template-columns: 1fr 6fr repeat(5, 1fr);
    padding: 10px;
  }
</style>
