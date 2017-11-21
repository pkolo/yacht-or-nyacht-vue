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
      <div class="content-section" v-if="personnel.songs_as_artist.length > 0">
        <div class="content-section-header">Artist Tracklist</div>
        <song-list v-bind:showFilter="false" :songs="personnel.songs_as_artist" />
      </div>
      <credit-list :credits="personnel.song_credits" :title="`Song Contributions`" :type="`songs`" v-if="personnel.song_credits.length > 0"/>
      <credit-list :credits="personnel.album_credits" :title="`Album Contributions`" :type="`albums`" v-if="personnel.album_credits.length > 0"/>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'

  import { utilities } from '../../mixins/utilities'

  import SongList from '../../components/SongList'
  import CreditList from '../../components/CreditList'

  export default {
    asyncData ({ params }) {
      let id = params.id.match(/\d+/)
      return axios.get(`/personnel/${id}`)
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
    mixins: [utilities]
  }
</script>

<style>

</style>
