<template>
  <div class="edit-episode-container">
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
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>

    <div class="add-song-section">
      <button class="new-song-btn" @click="toggleForm">+ Add New Song</button>

      <div class="admin-form" v-show="showForm">
        <form @submit.prevent="addSong" class="song-form">
          <div class="form-group">
            <div class="form-input">
              <label>Title: </label>
              <input type="text" v-model="song.title"/>
            </div>
            <div class="form-input">
              <label>Artist: </label>
              <input type="text" v-model="song.artist"/>
            </div>
            <div class="form-input">
              <label>Year: </label>
              <input type="number" v-model.number="song.year"/>
            </div>
          </div>

          <div class="form-group">
            <div class="form-input">
              <label>JD: </label>
              <input type="number" step="any" v-model.number="song.jd_score"/>
            </div>
            <div class="form-input">
              <label>Hunter: </label>
              <input type="number" step="any" v-model.number="song.hunter_score"/>
            </div>
            <div class="form-input">
              <label>Steve: </label>
              <input type="number" step="any" v-model.number="song.steve_score"/>
            </div>
            <div class="form-input">
              <label>Dave: </label>
              <input type="number" step="any" v-model.number="song.dave_score"/>
            </div>
          </div>

          <div class="form-group">
            <div class="yachtski-score">{{ avgScore }}</div>
            <button type="submit">Submit</button>
          </div>
        </form>
        <div class="errors" v-if="errors.length > 0">
          <div class="error-msg" v-for="error in errors">
            <p>{{ error }}</p>
          </div>
        </div>
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
          artist: ''
        },
        errors: [],
        showForm: false
      }
    },
    props: {
      title: String
    },
    methods: {
      addSong () {
        this.errors = []
        let credits = [{role: 'Temp Artist', personnel_attributes: {name: this.song.artist}}]
        this.song['credits_attributes'] = credits
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
              this.resetForm()
              this.$emit('submitSong', newSong)
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
        this.song.artist = ''
        this.showForm = false
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
    computed: {
      avgScore () {
        let form = this.song
        return ((form.jd_score + form.hunter_score + form.steve_score + form.dave_score) / 4.0)
      }
    }
  }
</script>

<style>
  .edit-episode-container {
  }

  .add-song-section {
    margin-bottom: 40px;
  }

  .admin-form {
    padding: 20px;
    border: 1px solid #444;
  }

  label {
    display: block;
    margin-bottom: 10px;
    font-weight: 400;
    font-size: 12px;
  }

  input {
    display: block;
    width: 600px;
    padding: 10px;
    font-size: 14px;
  }

  textarea {
    padding: 10px;
    width: 600px;
    font-size: 14px;
  }

  .song-form {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
  }

  .form-group {
    padding: 10px;
  }

  .form-input {
    display: grid;
    margin-bottom: 10px;
    grid-template-columns: 1fr 4fr;
  }
</style>
