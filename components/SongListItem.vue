<template>
  <div class="song-list-item" :style="{ backgroundColor: getColor(song.yachtski), border: `2px solid ${getColor(song.yachtski)}` }">
    <div class="num white">{{ song.yachtski | roundNum }}</div>
    <div class="artist-song-title">
      <artist-links :artists="song.artists" :featuredArtists="song.featured_artists" :songId="song.id" :songTitle="song.title" />
      <span class="song-title"><nuxt-link :to="{ path: `${song.resource_url}/${urlString(song.title)}` }">{{ song.title }}</nuxt-link></span>
    </div>
    <div class="num">{{ song[altColumnKey] }}</div>
    <div class="num white hidden-sm" :style="{ backgroundColor: getColor(song.scores.jd) }">{{ song.scores.jd }}</div>
    <div class="num white hidden-sm" :style="{ backgroundColor: getColor(song.scores.hunter) }">{{ song.scores.hunter }}</div>
    <div class="num white hidden-sm" :style="{ backgroundColor: getColor(song.scores.steve) }">{{ song.scores.steve }}</div>
    <div class="num white hidden-sm" :style="{ backgroundColor: getColor(song.scores.dave) }">{{ song.scores.dave }}</div>
    <div class="num hidden-sm" v-if="!/^\/admin(\/|$)/.test($route.fullPath)"><nuxt-link :to="{ path: `${song.episodes[0].resource_url}/${urlString(song.episodes[0].show_title)}`}">{{ song.episodes[0].number }}</nuxt-link></div>
    <div class="num hidden-sm" v-if="/^\/admin(\/|$)/.test($route.fullPath)"><nuxt-link :to="{ path: `/admin${song.resource_url}`}" target="_blank">Edit</nuxt-link></div>
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
  .song-list-item > * {
    padding: 8px;
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

  .white {
    color: #fff;
  }

  .white.missing {
    color: #744;
  }
</style>
