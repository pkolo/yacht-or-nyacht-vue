<template>
  <div class="container">
    <div class="content-header-container">
      <div class="content-header">
        <div class="title">
          {{ episode.title }}
        </div>
      </div>
    </div>
    <nuxt-child v-on:submitSong="pushSong" />
    <div class="content-container">
      <div class="content-section">
        <div class="content-section-header">Episode Tracklist</div>
        <song-list v-bind:showFilter="false" :songs="episode.songs" />
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  import { utilities } from '../../mixins/utilities'

  import SongList from '../../components/SongList'

  export default {
    asyncData ({ params }) {
      let id = params.id
      return axios.get(`${process.env.baseUrl}/episodes/${id}`)
        .then((res) => {
          return { episode: res.data }
        })
    },
    methods: {
      pushSong (newSong) {
        this.episode.songs.push(newSong)
      }
    },
    components: {
      SongList
    },
    mixins: [utilities]
  }
</script>

<style>
  .container {
    border: 1px solid #ababab;
  }

  .content-header {
    background: #ababab;
  }
</style>
