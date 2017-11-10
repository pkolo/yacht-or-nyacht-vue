<template>
  <div class="song-list">
    <song-list-filter v-model="filterText"/>
    <div class="song-list-header">
      <a href="#" @click="songSort('yachtski')">Yachtski</a>
      <div>
        <a href="#" @click="songSort('artists[0].name')">Artist</a> /
        <a href="#" @click="songSort('title')">Title</a> /
        <a href="#" @click="songSort('year')">Year</a>
      </div>
      <a href="#" @click="songSort('scores.jd')">JD</a>
      <a href="#" @click="songSort('scores.hunter')">Hunter</a>
      <a href="#" @click="songSort('scores.steve')">Steve</a>
      <a href="#" @click="songSort('scores.dave')">Dave</a>
      <a href="#" @click="songSort('episode.number')">Ep #</a>
    </div>
    <div class="song" v-for="song in filteredSongs">
      <song-list-item :song="song" />
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { sortBy } from 'lodash'
  import SongListFilter from './SongListFilter'
  import SongListItem from './SongListItem'

  export default {
    data () {
      return {
        songs: [],
        sortOrder: 'desc',
        filterText: ''
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
      },
      updateFilter () {
        this.filterText = 'sdfsdfsdfsd'
      }
    },
    computed: {
      filteredSongs () {
        let filter = new RegExp(this.filterText, 'i')
        return this.songs.filter(song => (song.title.match(filter) || song.artists[0].name.match(filter)))
      }
    },
    created () {
      axios.get('http://localhost:3000/api/v1/songs')
        .then(response => { this.songs = sortBy(response.data, 'yachtski').reverse() })
    },
    components: {
      SongListFilter,
      SongListItem
    }
  }
</script>

<style>
  .song-list-header {
    display: grid;
    grid-template-columns: 1fr 6fr repeat(5, 1fr);
    margin-bottom: 5px;
  }

  a, a:visited, a:active {
    text-decoration: none;
    color: #444;
  }
</style>
