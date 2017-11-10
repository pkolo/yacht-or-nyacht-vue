<template>
  <div class="song-list">
    <div class="song-list-header">
      <a href="#" @click="songSort('yachtski')">Yachtski</a>
      <a href="#" @click="songSort('title')">Title</a>
      <a href="#" @click="songSort('scores.jd')">JD</a>
      <a href="#" @click="songSort('scores.hunter')">Hunter</a>
      <a href="#" @click="songSort('scores.steve')">Steve</a>
      <a href="#" @click="songSort('scores.dave')">Dave</a>
      <a href="#" @click="songSort('episode.number')">Ep #</a>
    </div>
    <div class="song" v-for="song in songs">
      <song-bar :song="song" />
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { sortBy } from 'lodash'
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
          this.songs = sortBy(this.songs, [column]).reverse()
          this.sortOrder = 'asc'
        } else {
          this.songs = sortBy(this.songs, [column])
          this.sortOrder = 'desc'
        }
      }
    },
    created () {
      axios.get('http://localhost:3000/api/v1/songs')
        .then(response => { this.songs = sortBy(response.data, 'yachtski').reverse() })
    },
    components: {
      SongBar
    }
  }
</script>

<style>
  .song-list-header {
    display: grid;
    grid-template-columns: 1fr 6fr repeat(5, 1fr);
    margin-bottom: 5px;
  }
</style>
