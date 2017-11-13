<template>
  <section class="container">
    <song-list v-bind:showFilter="true" :songs="songs" />
  </section>
</template>

<script>
import axios from 'axios'
import { sortBy } from 'lodash'

import SongList from '../components/SongList'

export default {
  asyncData () {
    return axios.get(`http://localhost:3000/api/v1/songs`)
      .then((res) => {
        return { songs: sortBy(res.data, 'yachtski').reverse() }
      })
  },
  components: {
    SongList
  }
}
</script>

<style>

</style>
