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
      <song-list v-bind:showFilter="false" :songs="personnel.songs_as_artist" />
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  import { jayGradient } from '../../mixins/gradient'

  import SongList from '../../components/SongList'

  export default {
    asyncData ({ params }) {
      let id = params.slug.match(/\d+/)
      return axios.get(`http://localhost:3000/api/v1/personnel/${id}`)
        .then((res) => {
          return { personnel: res.data }
        })
    },
    components: {
      SongList
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
  .container {
    width: 75%;
    margin: 0 auto;
  }
</style>
