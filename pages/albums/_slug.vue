<template>
  <div class="container" :style="{ border: `1px solid ${getColor(album.yachtski)}` }">
    <div class="content-header-container">
      <div class="content-header" :style="{ background: getColor(album.yachtski) }">
        <div class="title">
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
        <song-list v-bind:showFilter="false" :songs="album.songs" />
      </div>
      <div class="content-section">
        <div class="content-section-header">Album Personnel</div>
        <player-list :players="album.players" />
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  import { jayGradient } from '../../mixins/gradient'

  import ArtistLinks from '../../components/ArtistLinks'
  import SongList from '../../components/SongList'
  import PlayerList from '../../components/PlayerList'

  export default {
    asyncData ({ params }) {
      let id = params.slug.match(/\d+/)
      return axios.get(`${process.env.baseUrl}/albums/${id}`)
        .then((res) => {
          return { album: res.data }
        })
    },
    components: {
      ArtistLinks,
      SongList,
      PlayerList
    },
    mixins: [jayGradient],
    filters: {
      roundNum: function (number) {
        return +number.toFixed(2)
      }
    }
  }
</script>

<style>
</style>
