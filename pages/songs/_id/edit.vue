<template>
  <div class="edit-song-container">
    <button class="add-album-btn" @click="albumSearch">Search for album</button>
    <div class="errors" v-if="errors.length > 0">
      <div class="error-msg" v-for="error in errors">
        <p>{{ error }}</p>
      </div>
    </div>
    <div class="suggestion-container" v-if="suggestions.length > 0">
      <div class="suggestion" v-for="suggestion in suggestions">
        <template>
          <span @click="fillInput">{{ suggestion.id }}</span> -
          <a :href="suggestion.url" target="_blank">{{ suggestion.title }} ({{ suggestion.year }})</a>
        </template>
      </div>
    </div>
    <form @submit.prevent="createAlbum" v-show="showForm">
      <label>Enter a Discogs ID</label>
      <input type="text" v-model="discogInput" />
      <input type="submit" />
    </form>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        discogInput: '',
        showForm: false,
        errors: [],
        suggestions: []
      }
    },
    methods: {
      albumSearch () {
        this.errors = []
        axios({
          method: 'post',
          url: `http://localhost:3000/api/v1/songs/${this.$route.params.id}/albums/search`
        })
          .then(res => console.log(res.data))
          .catch(err => {
            this.showForm = true
            this.suggestions = err.response.data.suggestions
            this.errors = err.response.data.errors
          })
      },
      fillInput () {
        this.discogInput = event.target.textContent
      }
    }
  }
</script>
