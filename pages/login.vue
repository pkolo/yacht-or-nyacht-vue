<template>
  <div class="login-container">
    <form @submit.prevent="submit" class="login-form left">
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
      submit () {
        this.$store.dispatch('auth/login', this.formData)
          .then(result => {
            this.$router.push('/admin')
          }).catch(error => {
            if (error.response && error.response.data) {
              this.errors = error.response.data.errors
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
