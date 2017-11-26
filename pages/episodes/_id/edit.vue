<template>
  <div class="edit-episode-container">
    <button class="new-song-btn" @click="toggleForm">+ Add New Song</button>
    <div class="add-song-form" v-show="showForm">
      <form @submit.prevent="addSong">
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
</template>

<script>
  import axios from '~/plugins/axios'

  export default {
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
    head () {
      return {
        title: `Editing ${this.title}`
      }
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
    width: 75%;
    margin: 20px auto;
  }

  .add-song-form {
    padding: 20px;
    border: 1px solid #444;
  }

  form {
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
