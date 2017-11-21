<template>
  <section class="container" :style="{ border: `1px ${getColor(song.yachtski)} solid` }">
    <div class="content-header-container">
      <div class="content-header" :style="{ background: getColor(song.yachtski) }">
        <div class="title">{{ song.title }}</div>
        <div class="subtitle">
          <artist-links :artists="song.artists" :featuredArtists="song.featured_artists" />
          <span v-if="song.album"><nuxt-link class="album-title" :to="{ path: `/albums/${song.album.id}/${urlString(song.album.title)}` }">{{ song.album.title }}</nuxt-link></span>
          <span>{{ song.year }}</span>
        </div>
      </div>
    </div>
    <div class="content-container">
      <nuxt-child v-on:updateSong="updateSong" />
      <yachtski-container :yachtski="song.yachtski" :scores="song.scores" />
      <div class="content-section">
        <div class="content-section-header">Listen</div>
        <div class="content-section listen-links">
          <div class="podcast-player">
            <div class="art19-web-player awp-medium awp-theme-light-blue" :data-primary-color="getColor(song.yachtski)" data-episode-id="94fb4fc2-5378-41e1-9836-04df553f8dc6"></div>
            <nuxt-link :to="{ path: `/episodes/${song.episode.id}/${urlString(song.episode.title)}` }">{{song.episode.title}} Full Tracklist</nuxt-link>
          </div>
          <iframe height="200" :src="`https://www.youtube.com/embed/${song.yt_id}?rel=0`" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
      <div class="content-section" v-if="song.players.length > 0">
        <div class="content-section-header">Song Personnel</div>
        <player-list :players="song.players" />
      </div>
      <div class="content-section" v-if="song.album && song.album.players.length > 0">
        <div class="content-section-header">Album Personnel</div>
        <player-list :players="song.album.players" />
      </div>
    </div>
  </section>
</template>

<script>
  import axios from '~/plugins/axios'

  import { utilities } from '../../mixins/utilities'

  import ArtistLinks from '../../components/ArtistLinks'
  import YachtskiContainer from '../../components/YachtskiContainer'
  import PlayerList from '../../components/PlayerList'

  export default {
    asyncData ({ params }) {
      let id = params.id.match(/\d+/)
      return axios.get(`/songs/${id}`)
        .then((res) => {
          return { song: res.data }
        })
    },
    components: {
      ArtistLinks,
      YachtskiContainer,
      PlayerList
    },
    methods: {
      updateSong (newSong) {
        this.song = newSong
      }
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
      }
    },
    mixins: [utilities]
  }
</script>

<style>
  .listen-links {
    display: grid;
    grid-template-columns: 575px 1fr;
    grid-gap: 20px;
  }
</style>
