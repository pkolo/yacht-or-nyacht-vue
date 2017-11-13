<template>
  <section class="container" :style="{ border: `1px ${getColor(song.yachtski)} solid` }">
    <div class="content-header-container">
      <div class="content-header" :style="{ background: getColor(song.yachtski) }">
        <div class="title">{{ song.title }}</div>
        <div class="subtitle">
          <span v-html="this.$options.filters.artistURL(song.artists, song.featured_artists)"></span>
          <span><i><a :href="song.album.url">{{ song.album.title }}</a></i></span>
          <span>{{ song.year }}</span>
        </div>
      </div>
    </div>
    <div class="content-container">
      <yachtski-container :yachtski="song.yachtski" :scores="song.scores" />
      <div class="content-section">
        <div class="content-section-header">Listen</div>
        <div class="content-section listen-links">
          <div class="art19-web-player awp-medium awp-theme-light-blue" :data-primary-color="getColor(song.yachtski)" data-episode-id="94fb4fc2-5378-41e1-9836-04df553f8dc6"></div>
          <iframe height="200" :src="`https://www.youtube.com/embed/${song.yt_id}?rel=0`" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
      <div class="content-section">
        <div class="content-section-header">Song Personnel</div>
        <player-list :players="song.players" />
      </div>
      <div class="content-section">
        <div class="content-section-header">Album Personnel</div>
        <player-list :players="song.album.players" />
      </div>
    </div>
  </section>
</template>

<script>
  import axios from 'axios'

  import { jayGradient } from '../../mixins/gradient'

  import YachtskiContainer from '../../components/YachtskiContainer'
  import PlayerList from '../../components/PlayerList'

  export default {
    asyncData ({ params }) {
      let id = params.slug.match(/\d+/)
      return axios.get(`http://localhost:3000/api/v1/songs/${id}`)
        .then((res) => {
          return { song: res.data }
        })
    },
    components: {
      YachtskiContainer,
      PlayerList
    },
    filters: {
      status: function (yachtski) {
        if (yachtski >= 90) {
          return 'Essential Yacht Rock'
        } else if (yachtski >= 50) {
          return 'Certified Yacht Rock'
        } else {
          return 'Nyacht Rock'
        }
      },
      artistURL: function (artists, featuredArtists) {
        let artistList = artists.map(a => `<a href=${a.url}>${a.name}</a>`).join(', ')
        if (featuredArtists.length > 0) {
          let featuredArtistList = featuredArtists.map(a => `<a href=${a.url}>${a.name}</a>`).join(', ')
          return `${artistList} w/ ${featuredArtistList}`
        }
        return artistList
      }
    },
    mixins: [jayGradient]
  }
</script>

<style>
  .listen-links {
    display: grid;
    grid-template-columns: 575px 1fr;
    grid-gap: 20px;
  }
</style>
