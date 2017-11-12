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
        <player-list :players="song.players" />
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
      artistURL: function (artists) {
        return artists.map(a => `<a class="white" href=${a.url}>${a.name}</a>`).join(', ')
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

  .song-container {
  }

  .song-header {
    margin-bottom: 20px;
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

  .yachtski-container {
    width: 60%;
    margin: 0 auto;
    background: #fff;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }

  .yachtski-big-score {
    text-align: center;
  }

  .yachtski-hosts {
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-gap: 5px;
    padding: 5px;
  }

  .yachtski-host-score {
    display: grid;
    grid-template-columns: 20px 1fr 1fr;
    grid-gap: 20px;
    border-bottom: 1px solid #dedede;
  }

  .yachtski-host-score:last-child {
    border-bottom: 0px solid #fff;
  }

  .yachtski-score {
    font-size: 50px;
  }

  .yachtski-status {
    font-size: 20px;
  }

  .white {
    color: #fff;
  }

  .song-info {
    padding: 0 20px;
  }

  .song-info > * {
    margin-bottom: 20px;
  }
</style>
