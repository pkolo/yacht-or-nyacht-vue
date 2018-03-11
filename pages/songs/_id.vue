<template>
  <section class="container" :style="{ border: `1px ${getColor(song.yachtski)} solid` }">
    <div class="content-header-container">
      <div class="content-header song-header" :style="{ background: getColor(song.yachtski) }">
        <div class="title">{{ song.title }}</div>

        <div class="subtitle">
          <artist-links :artists="song.artists" :featuredArtists="song.featured_artists" />
          <span v-if="song.album"><nuxt-link class="album-title" :to="{ path: `/albums/${song.album.id}/${urlString(song.album.title)}` }">{{ song.album.title }}</nuxt-link></span>
          <span>{{ song.year }}</span>
        </div>
      </div>

      <yachtski-container :yachtski="song.yachtski" :scores="song.scores" :yt="song.yt_id"/>
    </div>

    <div class="content-container">
      <nuxt-child v-on:updateSong="updateSong" :title="song.title" />
      <div class="content-section" ng-if="song.episodes.data_id.length > 0">
        <div class="content-section-header"><nuxt-link :to="{ path: `/episodes/${song.episodes[0].id}/${urlString(song.episodes[0].show_title)}` }">{{song.episodes[0].show_title}}</nuxt-link></div>

        <episode-player :color="getColor(song.yachtski)" :episode="song.episodes[0]" />
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
  import EpisodePlayer from '../../components/EpisodePlayer'

  export default {
    asyncData ({ params }) {
      let id = params.id.match(/\d+/)
      return axios.get(`/songs/${id}`)
        .then((res) => {
          return { song: res.data }
        })
    },
    head () {
      return {
        title: this.song.title,
        script: [
          { src: 'https://web-player.art19.com/assets/current.js' }
        ],
        link: [
          { rel: 'stylesheet', href: 'https://web-player.art19.com/assets/current.css' }
        ]
      }
    },
    components: {
      ArtistLinks,
      YachtskiContainer,
      PlayerList,
      EpisodePlayer
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
  .content-header.song-header {
    margin-bottom: 0;
    padding: 10px 20px 0;
  }

  .listen-links {
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-gap: 20px;
  }

  @media (max-width: 425px) {
    .content-header-container {
      padding: 0;
      margin-bottom: 40px;
    }

    .content-header.song-header {
      margin-bottom: 0;
      padding: 10px 10px 0;
    }
  }
</style>
