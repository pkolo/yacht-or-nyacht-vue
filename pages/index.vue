<template>
  <section class="container">
    <song-list v-bind:showFilter="true"/>
  </section>
</template>

<script>

import SongList from '../components/SongList'
export default {
  components: {
    SongList
  }
}
</script>

<style>

</style>
