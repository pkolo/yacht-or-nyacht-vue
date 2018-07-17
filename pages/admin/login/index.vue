<template>
  <div class="login-container">
    <form @submit.prevent="login" class="login-form left">
      <div>
        <p>Username</p>
        <input type="text" placeholder="username" v-model="formData.name" />
      </div>

      <div>
        <p>Password</p>
        <input type="password" placeholder="password" v-model="formData.password" />
      </div>

      <div class="submit-button">
        <button type="submit">Login</button>
      </div>
    </form>
    <div class="errors" v-if="errors.length > 0">
      <div class="error-msg" v-for="error in errors">
        <p>{{ error.detail }}</p>
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
          name: '',
          password: ''
        },
        errors: []
      }
    },
    head () {
      return {
        title: 'Login'
      }
    },
    methods: {
      login () {
        this.errors = []
        axios.post(`/login`, this.formData)
          .then(res => window.localStorage.setItem('yonToken', res.data.token))
          .catch(error => {
            this.errors = error.response.data.errors
          })
          .then(res => {
            if (this.errors.length === 0) {
              this.$router.push('/admin')
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

  .login-container {
    margin: 40px auto;
    max-width: 400px;
    text-align: center;
  }

  .login-form {
    padding: 40px;
    border: 1px solid slategrey;
    border-radius: 2px;
  }

  .left {
    text-align: left;
  }

  p {
    margin-bottom: 10px;
  }

  input {
    margin-bottom: 20px;
    padding: 10px;
    width: 300px;
    font-size: 16px;
  }

  button {
    padding: 10px;
    font-size: 16px;
  }
</style>
