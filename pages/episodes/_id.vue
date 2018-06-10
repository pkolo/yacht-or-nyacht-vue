<template>
  <div class="container">
    <div class="content-header-container">
      <div class="content-header">
        <div class="title">{{ episode.show_title }}</div>

        <div class="subtitle" v-if="episode.title">{{episode.title}}</div>
      </div>
    </div>

    <nuxt-child v-on:submitSong="pushSong" :title="episode.title" />

    <div class="content-container" v-if="episode.data_id">
      <div class="content-section">
        <div class="content-section-header">Episode Player</div>

        <episode-player color="#ababab" :episode="episode" />
      </div>
    </div>

    <div class="content-container">
      <div class="content-section">
        <div class="content-section-header">Episode Tracklist</div>

        <song-list v-bind:showFilter="false" :songs="episode.songs" />
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'

  import { utilities } from '../../mixins/utilities'

  import SongList from '../../components/SongList'
  import EpisodePlayer from '../../components/EpisodePlayer'

  export default {
    asyncData ({ params }) {
      let id = params.id
      return axios.get(`/episodes/${id}`)
        .then((res) => {
          return { episode: res.data }
        })
    },
    head () {
      return {
        title: this.episode.show_title,
        script: [
          { src: 'https://web-player.art19.com/assets/current.js' }
        ],
        link: [
          { rel: 'stylesheet', href: 'https://web-player.art19.com/assets/current.css' }
        ]
      }
    },
    methods: {
      pushSong (newSong) {
        this.episode.songs.push(newSong)
      }
    },
    components: {
      SongList,
      EpisodePlayer
    },
    mixins: [utilities]
  }
</script>

<style>
  .container {
    border: 1px solid #ababab;
  }

  .content-header {
    background: #ababab;
  }
</style>
