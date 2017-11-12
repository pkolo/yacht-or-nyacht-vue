<template>
  <div class="song-list-item" :style="{ backgroundColor: this.getColor(song.yachtski) }">
    <div>{{ song.yachtski | roundNum }}</div>
    <div>
      <span v-html="this.$options.filters.artistURL(song.artists)"></span> -
      <a :href="song.url">{{ song.title }}</a>
      <span>({{ song.year }})</span>
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
      },
      roundNum: function (number) {
        return number.toFixed(2)
      }
    },
    mixins: [jayGradient]
  }
</script>

<style>
  .song-list-item {
    display: grid;
    grid-template-columns: 1fr 6fr repeat(5, 1fr);
    margin-bottom: 5px;
  }

  .song-list-item > * {
    padding: 10px;
  }
</style>
