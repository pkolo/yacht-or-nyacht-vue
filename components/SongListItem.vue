<template>
  <div class="song-list-item" :style="{ backgroundColor: this.getColor(song.yachtski) }">
    <div>{{ song.yachtski | roundNum }}</div>
    <div class="artist-song-title">
      <artist-links :artists="song.artists" :featuredArtists="song.featured_artists" :songId="song.id" :songTitle="song.title" />
      <nuxt-link :to="{ path: `songs/${song.id}` }" class="song-title">{{ song.title }}</nuxt-link>
    </div>
    <div>{{ song.year }}</div>
    <div :style="{ backgroundColor: this.getColor(song.scores.jd) }">{{ song.scores.jd }}</div>
    <div :style="{ backgroundColor: this.getColor(song.scores.hunter) }">{{ song.scores.hunter }}</div>
    <div :style="{ backgroundColor: this.getColor(song.scores.steve) }">{{ song.scores.steve }}</div>
    <div :style="{ backgroundColor: this.getColor(song.scores.dave) }">{{ song.scores.dave }}</div>
    <div><a :href="song.episode.url">{{ song.episode.number }}</a></div>
  </div>
</template>

<script>
  import { jayGradient } from '../mixins/gradient'

  import ArtistLinks from './ArtistLinks'

  export default {
    props: {
      song: Object
    },
    components: {
      ArtistLinks
    },
    filters: {
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
    grid-template-columns: 1fr 6fr repeat(6, 1fr);
    margin-bottom: 5px;
  }

  .song-list-item > * {
    padding: 10px;
  }

  .song-title {
    display: inline-block;
  }

  .song-title:before {
    content: " - ";
    white-space: pre;
  }

  .artist-song-title {
    display: inline-block;
  }
</style>
