<template>
  <div class="container" :style="{ border: `1px solid ${getColor(album.yachtski)}` }">
    <div class="content-header-container">
      <div class="content-header" :style="{ background: getColor(album.yachtski) }">
        <div class="title album-title">
          {{ album.title }}
        </div>
        <div class="subtitle">
          <artist-links :artists="album.artists" />
          <span>{{ album.year }}</span>
          <span>{{ album.yachtski | roundNum }} Average Yachtski</span>
        </div>
      </div>
    </div>
    <div class="content-container">
      <div class="content-section">
        <div class="content-section-header">Album Tracklist</div>
        <song-list v-bind:showFilter="false" :songs="album.songs" v-bind:altColumn="{header: 'Track #', key: 'track_no'}"/>
      </div>
      <div class="content-section" v-if="album.players.length > 0">
        <div class="content-section-header">Album Personnel</div>
        <player-list :players="album.players" />
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'

  import { utilities } from '../../mixins/utilities'

  import ArtistLinks from '../../components/ArtistLinks'
  import SongList from '../../components/SongList'
  import PlayerList from '../../components/PlayerList'

  export default {
    asyncData ({ params }) {
      let id = params.id.match(/\d+/)
      return axios.get(`/albums/${id}`)
        .then((res) => {
          return {
            album: res.data,
            title: res.data.title
          }
        })
    },
    head () {
      return {
        title: this.title
      }
    },
    components: {
      ArtistLinks,
      SongList,
      PlayerList
    },
    mixins: [utilities],
    filters: {
      roundNum: function (number) {
        return +number.toFixed(2)
      }
    }
  }
</script>

<style>
</style>
