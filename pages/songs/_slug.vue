<template>
  <section class="container">
    <div class="song-header">
      <yachtski-block :yachtski="song.yachtski" :subtitle="song.yachtski | status"/>
      <div class="song-info">
        <div class="song-title">{{ song.title }}</div>
        <div class="song-artists">by <span v-html="this.$options.filters.artistURL(song.artists)"></span></div>
      </div>
    </div>
  </section>
</template>

<script>
  import axios from 'axios'

  import YachtskiBlock from '../../components/YachtskiBlock'

  export default {
    asyncData ({ params }) {
      let id = params.slug.match(/\d+/)
      return axios.get(`http://localhost:3000/api/v1/songs/${id}`)
        .then((res) => {
          return { song: res.data }
        })
    },
    filters: {
      status: function (yachtski) {
        if (yachtski >= 90) {
          return 'Essential'
        } else if (yachtski >= 50) {
          return 'Yacht'
        } else {
          return 'Nyacht'
        }
      },
      artistURL: function (artists) {
        return artists.map(a => `<a href=${a.url}>${a.name}</a>`).join(', ')
      }
    },
    components: {
      YachtskiBlock
    }
  }
</script>

<style>
  .song-header {
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-gap: 20px;
    margin-bottom: 5px;
  }

  .song-title {
    font-size: 64px;
  }

  .song-artists {
    font-size: 20px;
  }
</style>
