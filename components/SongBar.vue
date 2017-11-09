<template>
  <div class="song-bar">
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
  export default {
    props: {
      song: Object
    },
    filters: {
      artistURL: function (artists) {
        return artists.map(a => `<a href=${a.url}>${a.name}</a>`).join(', ')
      }
    }
  }
</script>

<style>
  .song-bar {
    display: grid;
    grid-template-columns: 1fr 6fr repeat(5, 1fr);
    padding: 10px;
  }
</style>
