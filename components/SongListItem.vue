<template>
  <div class="song-list-item" :style="{ backgroundColor: this.getColor(song.yachtski) }">
    <div>{{ song.yachtski | roundNum }}</div>
    <div>
      <div class="artist-links">
        <span v-for="artist in song.artists">
          <nuxt-link :to="{ path: `personnel/${artist.id}`}">{{ artist.name }}</nuxt-link>
        </span>
      </div>
      <div class="artist-links featured" v-if="song.featured_artists.length > 0">
        <span v-for="artist in song.featured_artists">
          <nuxt-link :to="{ path: `personnel/${artist.id}`}">{{ artist.name }}</nuxt-link>
        </span>
      </div>
      <nuxt-link class="song-title" :to="{ path: `songs/${song.id}`}">{{ song.title }}</nuxt-link>
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

  export default {
    props: {
      song: Object
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

  .artist-links {
    display: inline-block;
  }

  .artist-links > * + *:before {
    content: ", ";
    white-space: pre;
  }

  .featured:before {
    content: " w/ ";
    white-space: pre;
  }

  .song-title:before {
    content: " - ";
    white-space: pre;
  }
</style>
