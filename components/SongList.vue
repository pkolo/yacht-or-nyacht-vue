<template>
  <div class="song-list">
    <div class="song" v-for="song in songs">
      <p>{{ song.title }}</p>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        songs: []
      }
    },
    created () {
      axios.get('http://localhost:3000/api/v1/songs')
        .then(response => { this.songs = response.data })
    }
  }
</script>

<style>
</style>
