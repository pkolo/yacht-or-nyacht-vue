<template>
  <div class="song-list-item" :style="{ backgroundColor: getColor(song.yachtski) }">
    <div>{{ song.yachtski | roundNum }}</div>
    <div class="artist-song-title">
      <artist-links :artists="song.artists" :featuredArtists="song.featured_artists" :songId="song.id" :songTitle="song.title" />
      <span class="song-title"><nuxt-link :to="{ path: `${song.resource_url}/${urlString(song.title)}` }">{{ song.title }}</nuxt-link></span>
    </div>
    <div>{{ song[altColumnKey] }}</div>
    <div :style="{ backgroundColor: getColor(song.scores.jd) }">{{ song.scores.jd }}</div>
    <div :style="{ backgroundColor: getColor(song.scores.hunter) }">{{ song.scores.hunter }}</div>
    <div :style="{ backgroundColor: getColor(song.scores.steve) }">{{ song.scores.steve }}</div>
    <div :style="{ backgroundColor: getColor(song.scores.dave) }">{{ song.scores.dave }}</div>
    <div><nuxt-link :to="{ path: `${song.episode.resource_url}/${urlString(song.episode.title)}`}">{{ song.episode.number }}</nuxt-link></div>
  </div>
</template>

<script>
  import { utilities } from '../mixins/utilities'

  import ArtistLinks from './ArtistLinks'

  export default {
    props: {
      song: Object,
      altColumnKey: String
    },
    components: {
      ArtistLinks
    },
    filters: {
      roundNum: function (number) {
        return number.toFixed(2)
      }
    },
    mixins: [utilities]
  }
</script>

<style>
  .song-list-item {
    display: grid;
    grid-template-columns: 1fr 6fr repeat(6, 1fr);
    margin-bottom: 2px;
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
