<template>
  <div class="form-container">
    <div class="content-header">
      Create New Episode
    </div>

    <form @submit.prevent="createEpisode">
      <div class="form-group">
        <label>
          Series Name
        </label>

        <div>
          <select v-model="formData.show_id">
            <option v-for="show in shows" v-bind:value="show.id">
              {{show.title}}
            </option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label>
          Episode Number
        </label>

        <input type="text" v-model="formData.episode_no" placeholder="Episode Number" />
      </div>

      <div class="form-group">
        <label>
          Episode Title
        </label>

        <input type="text" v-model="formData.title" placeholder="Episode Title" />
      </div>

      <div class="form-group">
        <label>
          Episode Description
        </label>

        <textarea v-model="formData.notes" rows="4" placeholder="Episode Description"></textarea>
      </div>

      <div class="form-group">
        <label>
          Episode Link
        </label>

        <input type="text" v-model="formData.link" placeholder="Episode Link" />
      </div>

      <div>
        <button type="submit">Submit</button>
      </div>
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
    layout: 'admin',
    data () {
      return {
        formData: {
          notes: '',
          link: ''
        },
        errors: []
      }
    },
    asyncData () {
      return axios.get(`/shows`)
        .then((res) => {
          return {
            shows: res.data
          }
        })
    },
    head () {
      return {
        title: 'Create New Episode'
      }
    },
    methods: {
      createEpisode () {
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
            let episodeUrl = res.data.resource_url
            console.log(res.data)
            if (this.errors.length === 0) {
              this.$router.push(`/admin${episodeUrl}`)
            }
          })
      }
    }
  }
</script>

<style>
  .form-group {
    margin-bottom: 30px;
  }

  label {
    display: block;
    margin-bottom: 10px;
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
</style>
