<template>
  <div class="stat-bar-section">
    <div class="stat-bar-header" v-if="index === 0">
      <div class="host-name">
        {{ host }}
      </div>

      <div>
        &nbsp
      </div>

      <div class="other-name">
        {{ otherHost }}
      </div>
    </div>

    <div class="stat-bar-item" :style="{ backgroundColor: getColor(song.yachtski) }">
      <div class="white" :style="{ backgroundColor: getColor(hostStat) }">
        {{ hostStat | roundNum }}
      </div>

      <div>
        <div class="artist-song-title">
          <artist-links :artists="song.artists" :featuredArtists="song.featured_artists" :songId="song.id" :songTitle="song.title" />
          <span class="song-title"><nuxt-link :to="{ path: `${song.resource_url}/${urlString(song.title)}` }">{{ song.title }}</nuxt-link></span>
        </div>
      </div>

      <div class="white" :style="{ backgroundColor: getColor(otherHostStat) }">
        {{ otherHostStat | roundNum }}
      </div>
    </div>
  </div>
</template>

<script>
  import { utilities } from '../mixins/utilities'

  import ArtistLinks from './ArtistLinks'

  export default {
    props: {
      index: Number,
      host: String,
      otherHost: String,
      hostStat: Number,
      otherHostStat: Number,
      song: Object
    },
    components: {
      ArtistLinks
    },
    filters: {
      roundNum: function (number) {
        return Math.round(number * 100) / 100
      }
    },
    mixins: [utilities]
  }
</script>

<style>
.stat-bar-header,
.stat-bar-item {
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  margin-bottom: 5px;
  text-align: center;
}

.stat-bar-header .host-name {
  font-size: 16px;
}

.stat-bar-item > * {
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
</style>
