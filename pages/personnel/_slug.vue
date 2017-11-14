<template>
  <div class="container" :style="{ border: `1px solid ${getColor(personnel.yachtski)}` }">
    <div class="content-header-container">
      <div class="content-header" :style="{ background: getColor(personnel.yachtski) }">
        <div class="title">
          {{ personnel.name }}
        </div>
        <div class="subtitle">
          <span>{{ personnel.song_credits.length }} credits</span>
          <span>{{ personnel.yachtski | roundNum }} Average Yachtski Score</span>
        </div>
      </div>
    </div>
    <div class="content-container">
      <div class="content-section">
        <div class="content-section-header">Artist Tracklist</div>
        <song-list v-bind:showFilter="false" :songs="personnel.songs_as_artist" />
      </div>
      <credit-list :credits="personnel.song_credits" :title="`Song Contributions`" :type="`songs`" />
      <credit-list :credits="personnel.album_credits" :title="`Album Contributions`" :type="`albums`" />
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  import { jayGradient } from '../../mixins/gradient'

  import SongList from '../../components/SongList'
  import CreditList from '../../components/CreditList'

  export default {
    asyncData ({ params }) {
      let id = params.slug.match(/\d+/)
      return axios.get(`${process.env.baseUrl}/personnel/${id}`)
        .then((res) => {
          return { personnel: res.data }
        })
    },
    components: {
      SongList,
      CreditList
    },
    filters: {
      roundNum: function (number) {
        return +number.toFixed(2)
      }
    },
    mixins: [jayGradient]
  }
</script>

<style>

</style>
