<template>
  <div class="form-container">
    <form @submit.prevent="postEpisode">
      <input type="text" v-model="formData.number" placeholder="Episode #" />
      <input type="text" v-model="formData.notes" placeholder="Notes" />
      <input type="text" v-model="formData.link" placeholder="Link" />
      <button type="submit">Submit</button>
    </form>
    <div class="errors" v-if="errors.length > 0">
      <div class="error-msg" v-for="error in errors">
        <p>{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'

  export default {
    data () {
      return {
        formData: {
          number: '',
          notes: '',
          link: ''
        },
        errors: []
      }
    },
    methods: {
      postEpisode () {
        this.errors = []
        axios({
          method: 'post',
          url: `/episodes`,
          data: this.formData,
          headers: {'Authorization': `Token token=${window.localStorage.getItem('yonToken')}`}
        })
          .catch(error => {
            this.errors = error.response.data.errors
          })
          .then(res => {
            let episodeUrl = res.data.url
            if (this.errors.length === 0) {
              this.$router.push(`${episodeUrl}`)
            }
          })
      }
    }
  }
</script>

<style>
  input {
    display: block;
    margin-bottom: 10px;
  }
</style>
