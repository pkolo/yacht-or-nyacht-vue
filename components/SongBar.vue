<template>
  <div class="song-bar" :style="{ backgroundColor: this.getColor(song.yachtski) }">
    <div>{{ song.yachtski }}</div>
    <div>
      <span v-html="this.$options.filters.artistURL(song.artists)"></span> - {{ song.title }} ({{ song.year }})
    </div>
    <div :style="{ backgroundColor: this.getColor(song.scores.jd) }">{{ song.scores.jd }}</div>
    <div :style="{ backgroundColor: this.getColor(song.scores.hunter) }">{{ song.scores.hunter }}</div>
    <div :style="{ backgroundColor: this.getColor(song.scores.steve) }">{{ song.scores.steve }}</div>
    <div :style="{ backgroundColor: this.getColor(song.scores.dave) }">{{ song.scores.dave }}</div>
    <div>{{ song.episode.number }}</div>
  </div>
</template>

<script>
  import { jayGradient } from '../mixins/gradient'

  export default {
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
    margin-bottom: 5px;
  }

  .song-bar > * {
    padding: 10px;
  }
</style>
