<template>
  <div class="song-list">
    <a href="#" @click="songSort('yachtski')">Sort</a>
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
        songs: [],
        sortOrder: 'desc',
        sortBy: 'yachtski'
      }
    },
    methods: {
      songSort (column) {
        if (this.sortOrder === 'desc') {
          this.songs = this.songs.sort((s1, s2) => s1.yachtski - s2.yachtski)
          this.sortOrder = 'asc'
        } else {
          this.songs = this.songs.sort((s1, s2) => s2.yachtski - s1.yachtski)
          this.sortOrder = 'desc'
        }
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
