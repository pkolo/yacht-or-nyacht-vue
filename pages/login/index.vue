<template>
  <div class="container">
    <form @submit.prevent="login">
      <input type="text" placeholder="username" v-model="formData.name" />
      <input type="password" placeholder="password" v-model="formData.password" />
      <button type="submit">Submit</button>
    </form>
    <div class="errors" v-if="errors.length > 0">
      <div class="error-msg" v-for="error in errors">
        <p>{{ error.detail }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        formData: {
          name: '',
          password: ''
        },
        errors: []
      }
    },
    methods: {
      login () {
        this.errors = []
        axios.post(`${process.env.baseUrl}/login`, this.formData)
          .then(res => window.localStorage.setItem('yonToken', res.data.token))
          .catch(error => {
            this.errors = error.response.data.errors
          })
          .then(res => {
            if (this.errors.length === 0) {
              this.$router.push('/')
            }
          })
      },
      clearErrors () {
        this.errors = []
      }
    }
  }
</script>

<style>
</style>
