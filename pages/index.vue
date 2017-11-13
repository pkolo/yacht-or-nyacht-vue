<template>
  <section class="container">
    <song-list v-bind:showFilter="true" :songs="songs" />
  </section>
</template>

<script>
import axios from 'axios'

import SongList from '../components/SongList'

export default {
  asyncData () {
    return axios.get(`http://localhost:3000/api/v1/songs`)
      .then((res) => {
        return { songs: res.data }
      })
  },
  components: {
    SongList
  }
}
</script>

<style>

</style>
