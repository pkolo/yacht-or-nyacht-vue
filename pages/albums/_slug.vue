<template>
  <div class="container" :style="{ border: `1px solid ${getColor(album.yachtski)}` }">
    <div class="content-header-container">
      <div class="content-header" :style="{ background: getColor(album.yachtski) }">
        <div class="title">
          {{ album.title }}
        </div>
        <div class="subtitle">
          <span v-html="this.$options.filters.artistURL(album.artists)"></span>
          <span>{{ album.year }}</span>
          <span>{{ album.yachtski | roundNum }} Average Yachtski</span>
        </div>
      </div>
    </div>
    <div class="content-container">
      <div class="content-section">
        <div class="content-section-header">Album Tracklist</div>
        <song-list v-bind:showFilter="false" :songs="album.songs" />
      </div>
      <player-list :players="album.players" title="`Album Credits`" />
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  import { jayGradient } from '../../mixins/gradient'

  import SongList from '../../components/SongList'
  import PlayerList from '../../components/PlayerList'

  export default {
    asyncData ({ params }) {
      let id = params.slug.match(/\d+/)
      return axios.get(`http://localhost:3000/api/v1/albums/${id}`)
        .then((res) => {
          return { album: res.data }
        })
    },
    components: {
      SongList,
      PlayerList
    },
    mixins: [jayGradient],
    filters: {
      artistURL: function (artists) {
        let artistList = artists.map(a => `<a href=${a.url}>${a.name}</a>`).join(', ')
        return artistList
      },
      roundNum: function (number) {
        return +number.toFixed(2)
      }
    }
  }
</script>

<style>
</style>
