<template>
  <div class="admin-container">
    <div class="admin-content-header">Editing {{song.title}}</div>

    <div class="admin-form">
      <div>Basic Information</div>

      <form @submit.prevent="updateSong()">
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
            <div class="yachtski-score" :style="{ color: getColor(yachtski) }">{{ yachtski | roundNum }}</div>
            <button type="submit" @click="updateSong">Submit</button>
          </div>
        </div>
      </form>
    </div>

    <div class="admin-form">
      <div style="margin-bottom:10px">Discogs Album ID</div>

      <div class="scores-group">
        <div class="form-group">
          <div>
            <label>ID</label>
            <input type="text" v-model="discogId"/>
          </div>

          <div>
            <button @click="createAlbum(discogId)">Submit</button>
          </div>
        </div>

        <div class="form-group">
          <label>Replace Discog</label>
          <button @click="albumSearch()">Search</button>
        </div>
      </div>

      <div class="suggestion-container" v-if="searchResults.length > 0">
        <div class="search-result" v-for="searchResult in searchResults">
          <div>{{searchResult.id}}</div>

          <div><a :href="searchResult.url" target="_blank">{{ searchResult.title }}</a></div>

          <div>({{ searchResult.year }})</div>

          <div><a href="" @click.prevent="setDiscog(searchResult.id)">Use</a></div>
        </div>
      </div>
    </div>

    <div class="admin-form">
      <div style="margin-bottom:10px">Artists</div>

      <player-list :players="song.artists"/>
    </div>

    <div class="admin-form">
      <div style="margin-bottom:10px">Credits</div>

      <player-list :players="song.players"/>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import { get } from 'lodash'

  import { utilities } from '../../../mixins/utilities'

  import PlayerList from '../../../components/PlayerList'

  export default {
    layout: 'admin',
    asyncData ({ params }) {
      let id = params.id.match(/\d+/)
      return axios.get(`/songs/${id}`)
        .then((res) => {
          return {
            song: res.data,
            discogId: get(res.data, 'album.discog_id') || null
          }
        })
    },
    data () {
      return {
        errors: [],
        searchResults: []
      }
    },
    head () {
      return {
        title: 'Editing Song'
      }
    },
    components: {
      PlayerList
    },
    methods: {
      updateSong () {
        this.errors = []
        axios({
          method: 'put',
          url: `/songs/${this.$route.params.id}`,
          data: {
            song: {
              title: this.song.title,
              year: this.song.year,
              jd_score: this.song.scores.jd,
              hunter_score: this.song.scores.hunter,
              steve_score: this.song.scores.steve,
              dave_score: this.song.scores.dave
            }
          }
        })
          .then(res => {
            this.$emit('replaceSong', res.data)
          })
          .catch(err => {
            console.log(err)
          })
      },
      replaceSong (newSong) {
        this.song = newSong
      },
      albumSearch () {
        this.errors = []
        axios({
          method: 'post',
          url: `/songs/${this.$route.params.id}/albums/search`
        })
          .then(res => {
            this.$emit('replaceSong', res.data)
          })
          .catch(err => {
            this.searchResults = err.response.data.suggestions
            this.errors = err.response.data.errors
          })
      },
      setDiscog (discogId) {
        this.discogId = discogId
      },
      createAlbum (discogId) {
        this.errors = []
        let data = {
          album: {
            discog_id: discogId
          }
        }
        axios({
          method: 'post',
          url: `/songs/${this.$route.params.id}/albums`,
          data: data
        })
          .then(res => {
            this.$emit('replaceSong', res.data)
            this.searchResults = []
          })
          .catch(err => {
            this.errors = err.response.data.errors
          })
      }
    },
    filters: {
      roundNum: function (number) {
        return number.toFixed(2)
      }
    },
    mixins: [utilities],
    computed: {
      yachtski () {
        let scores = [this.song.scores.jd, this.song.scores.hunter, this.song.scores.steve, this.song.scores.dave]
        let scoreLength = scores.filter(score => (score !== 0 && score !== '')).length
        let scoreTotal = scores.reduce((sum, score) => (Number.isInteger(score) ? sum + score : sum + 0))
        return (scoreTotal / scoreLength) || 0
      }
    }
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

  .suggestion-container {
    padding-top: 20px;
  }

  .search-result {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr 1fr;
    padding: 2px;
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
