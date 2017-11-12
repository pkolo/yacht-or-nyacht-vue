<template>
  <div class="song-list">
    <song-list-filter v-show="showFilter" v-model="filterText"/>
    <div class="song-list-header">
      <span @click="songSort('yachtski')">Yachtski</span>
      <div>
        <span @click="songSort('artists[0].name')">Artist</span> -
        <span @click="songSort('title')">Title</span>
      </div>
      <span @click="songSort('year')">Year</span>
      <span @click="songSort('scores.jd')">JD</span>
      <span @click="songSort('scores.hunter')">Hunter</span>
      <span @click="songSort('scores.steve')">Steve</span>
      <span @click="songSort('scores.dave')">Dave</span>
      <span @click="songSort('episode.number')">Ep #</span>
    </div>
    <div class="song" v-for="song in filteredSongs">
      <song-list-item :song="song" />
    </div>
  </div>
</template>

<script>
  import { sortBy } from 'lodash'
  import SongListFilter from './SongListFilter'
  import SongListItem from './SongListItem'

  export default {
    data () {
      return {
        sortOrder: 'desc',
        filterText: ''
      }
    },
    props: {
      showFilter: Boolean,
      songs: Array
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
    computed: {
      filteredSongs () {
        let filter = new RegExp(this.filterText, 'i')
        return this.songs.filter(song => (song.title.match(filter) || song.artists[0].name.match(filter)))
      }
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
    grid-template-columns: 1fr 6fr repeat(6, 1fr);
    margin-bottom: 5px;
    background: #ababab;
    color: #fff;
  }

  .song-list-header > * {
    padding: 10px;
    cursor: pointer;
  }
</style>
