<template>
  <div class="admin-container">
    <div class="admin-content-header">Editing {{song.title}}</div>

    <div class="admin-form">
      <div>Basic Information</div>

      <form @submit.prevent="addSong">
        <div class="form-group">
            <label>Title</label>
            <input type="text" v-model="song.title"/>
        </div>

        <div class="form-group">
          <label>Year</label>
          <input type="number" v-model.number="song.year"/>
        </div>

        <div class="bottom-group">
          <div class="scores-group">
            <div class="form-group">
              <label>JD</label>
              <input type="number" step="any" v-model.number="song.scores.jd"/>
            </div>

            <div class="form-group">
              <label>Hunter</label>
              <input type="number" step="any" v-model.number="song.scores.hunter"/>
            </div>

            <div class="form-group">
              <label>Steve</label>
              <input type="number" step="any" v-model.number="song.scores.steve"/>
            </div>

            <div class="form-group">
              <label>Dave</label>
              <input type="number" step="any" v-model.number="song.scores.dave"/>
            </div>
          </div>

          <div class="submit-group">
            <div class="yachtski-score" :style="{ color: getColor(song.yachtski) }">{{ song.yachtski | roundNum }}</div>
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>

      <!-- <div class="errors" v-if="errors.length > 0">
        <div class="error-msg" v-for="error in errors">
          <p>{{ error }}</p>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'

  import { utilities } from '../../../mixins/utilities'

  import ArtistLinks from '../../../components/ArtistLinks'
  import YachtskiContainer from '../../../components/YachtskiContainer'
  import PlayerList from '../../../components/PlayerList'
  import EpisodePlayer from '../../../components/EpisodePlayer'

  export default {
    layout: 'admin',
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
