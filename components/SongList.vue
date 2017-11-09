<template>
  <div class="song-list">
    <div class="song" v-for="song in songs">
      <song-bar :song="song" />
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import SongBar from './SongBar'

  export default {
    data () {
      return {
        songs: []
      }
    },
    created () {
      axios.get('http://localhost:3000/api/v1/songs')
        .then(response => { this.songs = response.data.sort((s1, s2) => s2.yachtski - s1.yachtski) })
    },
    components: {
      SongBar
    }
  }
</script>

<style>

</style>
