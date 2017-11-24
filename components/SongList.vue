<template>
  <div class="song-list-container">
    <div class="widget-section">
      <song-list-filter v-show="showFilter" v-model="filterText"/>
    </div>
    <div class="song-list-header">
      <span class="num" @click="songSort('yachtski')">Yachtski</span>
      <div>
        <span @click="songSort('artists[0].name')">Artist</span> -
        <span @click="songSort('title')">Title</span>
      </div>
      <span class="num" @click="songSort(altColumn.key)">{{ altColumn.header }}</span>
      <span class="num" @click="songSort('scores.jd')">JD</span>
      <span class="num" @click="songSort('scores.hunter')">Hunter</span>
      <span class="num" @click="songSort('scores.steve')">Steve</span>
      <span class="num" @click="songSort('scores.dave')">Dave</span>
      <span class="num" @click="songSort('episode.number')">Ep #</span>
    </div>
    <div class="song-list">
      <div class="song" v-for="song in sortedSongs" v-show="songSearch(song.title, song.artists[0].name)" >
        <song-list-item :song="song" :altColumnKey="altColumn.key" />
      </div>
    </div>
  </div>
</template>

<script>
  import { orderBy } from 'lodash'
  import SongListFilter from './SongListFilter'
  import SongListItem from './SongListItem'

  export default {
    data () {
      return {
        sortDesc: true,
        sortColumn: 'yachtski',
        filterText: '',
        sortedSongs: orderBy(this.songs, ['yachtski'], ['desc'])
      }
    },
    props: {
      showFilter: Boolean,
      songs: Array,
      altColumn: {
        type: Object,
        default () {
          return {
            header: 'Year',
            key: 'year'
          }
        },
        required: false
      }
    },
    methods: {
      songSort (column) {
        if (column === this.sortColumn) {
          this.sortDesc = !this.sortDesc
          this.sortedSongs = orderBy(this.sortedSongs, [this.sortColumn], [this.sortValue()])
        } else {
          this.sortColumn = column
          this.sortedSongs = orderBy(this.sortedSongs, [this.sortColumn], [this.sortValue()])
        }
      },
      sortValue () {
        if (this.sortDesc) {
          return 'desc'
        } else {
          return 'asc'
        }
      },
      songSearch (title, artist) {
        return (title.match(this.matchFilter) || artist.match(this.matchFilter))
      }
    },
    watch: {
      songs: function (newSongs) {
        this.sortedSongs = newSongs
      }
    },
    computed: {
      matchFilter () {
        let filter = new RegExp(this.filterText, 'i')
        return filter
      }
    },
    components: {
      SongListFilter,
      SongListItem
    }
  }
</script>

<style>
  .song-list-container {
  }

  .widget-section {
  }

  .song-list-header,
  .song-list-item {
    display: grid;
    grid-template-columns: 1fr 6fr repeat(6, 1fr);
    margin-bottom: 2px;
  }

  .song-list-header > *,
  .song-list-item > * {
    padding: 7px;
  }

  .song-list-header {
    cursor: pointer;
    background: #ababab;
    color: #fff;
  }

  .song-list-header span:hover {
    text-decoration: underline;
  }

  .song-list {
    overflow-y: auto;
  }

  .song-list::-webkit-scrollbar {
    width: 2px;
  }

  .song-list::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  }

  .song-list::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }

  .num {
    text-align: right;
  }
</style>
