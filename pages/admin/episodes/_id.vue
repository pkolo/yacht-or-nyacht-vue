<template>
  <div class="admin-container">
    <div class="admin-content-header">Editing {{episode.show_title}}</div>

    <div class="admin-form">
      <div>Basic Episode Information</div>

      <form @submit.prevent="updateEpisode">
        <div class="form-group">
          <label>
            Episode Title
          </label>

          <input type="text" v-model="updatedEpisode.title" :placeholder="episode.title" />
        </div>

        <div class="form-group">
          <label>
            Episode Description
          </label>

          <textarea v-model="updatedEpisode.notes" rows="4" :placeholder="episode.notes"></textarea>
        </div>

        <div class="form-group">
          <label>
            Episode Link
          </label>

          <input type="text" v-model="updatedEpisode.link" :placeholder="episode.link" />
        </div>

        <div class="form-group">
          <label>
            Published?
          </label>

          <input type="checkbox" id="published" v-model="updatedEpisode.published">
        </div>

        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>

    <div>
      <song-list v-bind:showFilter="false" :songs="episode.songs" />
    </div>

    <div class="admin-form">
      <div>Add Song</div>

      <form @submit.prevent="addSong">
        <div class="form-group">
            <label>Title</label>
            <input type="text" v-model="song.title"/>
        </div>

        <div class="form-group">
          <label>Artist</label>
          <input type="text" v-model="searchQ" @input="personnelSearch()"/>

          <div v-if="results.length > 0" class="typeahead-container">
            <div class="typeahead-content">
              <div class="typeahead-result" v-on:click="setArtistFromQ()">
                <span>{{this.searchQ}}</span>
              </div>

              <div class="typeahead-result" v-for="result in results" v-on:click="setArtist(result)">
                <span>{{result.name}} ({{result.id}})</span>
              </div>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label>Year</label>
          <input type="number" v-model.number="song.year"/>
        </div>

        <div class="bottom-group">
          <div class="scores-group">
            <div class="form-group">
              <label>JD</label>
              <input type="number" step="any" v-model.number="song.jd_score"/>
            </div>

            <div class="form-group">
              <label>Hunter</label>
              <input type="number" step="any" v-model.number="song.hunter_score"/>
            </div>

            <div class="form-group">
              <label>Steve</label>
              <input type="number" step="any" v-model.number="song.steve_score"/>
            </div>

            <div class="form-group">
              <label>Dave</label>
              <input type="number" step="any" v-model.number="song.dave_score"/>
            </div>
          </div>

          <div class="submit-group">
            <div class="yachtski-score" :style="{ color: getColor(avgScore) }">{{ avgScore | roundNum }}</div>
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>

      <div class="errors" v-if="errors.length > 0">
        <div class="error-msg" v-for="error in errors">
          <p>{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import { utilities } from '../../../mixins/utilities'

  import SongList from '../../../components/SongList'

  export default {
    layout: 'admin',
    components: {
      SongList
    },
    asyncData ({ params }) {
      let id = params.id
      return axios.get(`/episodes/${id}`)
        .then((res) => {
          return {
            episode: res.data,
            updatedEpisode: res.data
          }
        })
    },
    head () {
      return {
        title: `Editing ${this.episode.show_title}`
      }
    },
    data () {
      return {
        song: {
          title: '',
          year: 0,
          jd_score: 0,
          hunter_score: 0,
          steve_score: 0,
          dave_score: 0,
          artist: {
            name: '',
            id: null
          }
        },
        errors: [],
        showForm: false,
        searchQ: '',
        results: []
      }
    },
    props: {
      title: String
    },
    methods: {
      personnelSearch () {
        this.results = []

        axios({
          method: 'get',
          url: `/personnel/search?q=${this.searchQ}`
        })
          .then(res => {
            this.results = res.data
          })
      },
      setArtist (result) {
        this.song.artist.name = result.name
        this.song.artist.discog_id = result.discog_id
        this.song.artist.id = result.id

        this.searchQ = this.song.artist.name
        this.results = []
      },
      setArtistFromQ () {
        this.song.artist.name = this.searchQ
        this.song.artist.id = null
        this.song.artist.discog_id = null

        this.searchQ = this.song.artist.name
        this.results = []
      },
      addSong () {
        this.errors = []
        let artist = this.song.artist.discog_id ? this.song.artist : { name: this.searchQ }

        this.song['credits_attributes'] = [{
          role: 'Temp Artist',
          personnel_attributes: artist
        }]

        let formData = {'song': this.song}
        axios({
          method: 'post',
          data: JSON.stringify(formData),
          url: `/episodes/${this.$route.params.id}/songs`,
          headers: {
            'Authorization': `Token token=${window.localStorage.getItem('yonToken')}`,
            'Content-Type': 'application/json'
          }
        })
          .then(res => {
            let newSong = res.data
            if (this.errors.length === 0) {
              this.episode.songs.push(newSong)
              this.resetForm()
            }
          })
          .catch(err => {
            this.errors = err.response.data.errors
          })
      },
      resetForm () {
        this.song.title = ''
        this.song.year = 0
        this.song.jd_score = 0
        this.song.hunter_score = 0
        this.song.steve_score = 0
        this.song.dave_score = 0
        this.song.artist = {
          name: '',
          id: null
        }
        this.showForm = false
        this.searchQ = ''
        this.results = []
      },
      toggleForm () {
        this.showForm = !this.showForm
      },
      updateEpisode () {
        this.errors = []
        let formData = {'episode': this.updatedEpisode}
        axios({
          method: 'put',
          data: JSON.stringify(formData),
          url: `/episodes/${this.$route.params.id}`,
          headers: {
            'Authorization': `Token token=${window.localStorage.getItem('yonToken')}`,
            'Content-Type': 'application/json'
          }
        })
          .then(res => {
            this.episode = res.data
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
      avgScore () {
        let form = this.song
        let scores = [form.jd_score, form.hunter_score, form.steve_score, form.dave_score]
        let scoreLength = scores.filter(score => (score !== 0 && score !== '')).length
        let scoreTotal = scores.reduce((sum, score) => (Number.isInteger(score) ? sum + score : sum + 0))
        return (scoreTotal / scoreLength) || 0
      }
    }
  }
</script>

<style>
  .edit-episode-container > * {
    margin-bottom: 30px;
  }

  .typeahead-container {
    position: relative;
  }

  .typeahead-content {
    position: absolute;
    width: 320px;
    z-index: 1;
    background: #fff;
    border: 1px solid #444;
    font-size: 13px;
    max-height: 240px;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .typeahead-result {
    padding: 10px;
  }

  .typeahead-result:hover {
    background: #ffe;
    cursor: pointer;
  }
</style>
