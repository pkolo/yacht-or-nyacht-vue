<template>
  <section class="container">
    <div class="song-container" :style="{ border: `1px ${getColor(song.yachtski)} solid` }">
      <div class="song-header">
        <div class="song-main-info" :style="{ background: getColor(song.yachtski) }">
          <div class="song-title">{{ song.title }}</div>
          <div class="song-subtitle">
            <span v-html="this.$options.filters.artistURL(song.artists)"></span>
            <span><i>{{ song.album.title }}</i></span>
            <span>{{ song.year }}</span>
          </div>
        </div>
      </div>
      <div class="song-info">
        <yachtski-container :yachtski="song.yachtski" :scores="song.scores" />
        <div class="song-info-section">
          <div class="song-info-header">Listen</div>
          <div class="listen-links">
            <div class="art19-web-player awp-medium awp-theme-light-blue" :data-primary-color="getColor(song.yachtski)" data-episode-id="94fb4fc2-5378-41e1-9836-04df553f8dc6"></div>
            <iframe height="200" :src="`https://www.youtube.com/embed/${song.yt_id}?rel=0`" frameborder="0" allowfullscreen></iframe>
          </div>
        </div>
        <player-list :title="`Track Personnel`" :players="song.players" />
        <player-list :title="`Album Personnel`" :players="song.album.players" />
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
      }
    },
    mixins: [jayGradient]
  }
</script>

<style>

  .container {
      width: 75%;
      margin: 0 auto;
  }

  .song-header {
    color: #fff;
    text-align: center;
  }

  .song-main-info {
    padding: 20px 10px;
  }

  .song-title {
    font-size: 50px;
  }

  .song-subtitle {
    font-size: 20px;
  }

  .song-subtitle > * + *:before{
    content: " | ";
    padding: 0 10px;
  }

  .white {
    color: #fff;
  }

  .song-info {
    padding: 0 20px;
  }

  .song-info-section {
    margin-bottom: 40px;
  }

  .song-info-header {
    margin-bottom: 5px;
    padding-bottom: 5px;
    font-size: 18px;
    border-bottom: 1px solid #dedede;
  }

  .listen-links {
    display: grid;
    grid-template-columns: 575px 1fr;
    grid-gap: 20px;
  }
</style>
