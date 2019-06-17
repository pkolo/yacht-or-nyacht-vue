<template>
  <div class="request-container">
    <form @submit.prevent="onSubmit" class="request-form" v-if="!this.result">
      <div class="request-form-header">
        Yachtski Request Form
      </div>

      <div>
        <p>Your Name *</p>
        <input type="text" placeholder="Your name" v-model="formData.name" />
      </div>

      <div>
        <div>
          <p>Artist *</p>
          <input type="text" placeholder="Artist name" v-model="formData.artist" />
        </div>

        <div>
          <p>Song Title *</p>
          <input type="text" placeholder="Song title" v-model="formData.title" />
        </div>
      </div>

      <div>
        <p>Link</p>
        <input type="text" placeholder="Link to song video or audio" v-model="formData.link" />
      </div>

      <div style="margin-bottom: 20px;">
        <p>Message *</p>
        <textarea placeholder="Enter your message here..." v-model="formData.message" rows="4" />
      </div>

      <div class="errors" v-if="errors.length > 0">
        <div class="error-msg" v-for="error in errors">
          <p>{{ error }}</p>
        </div>
      </div>


      <div class="submit-button" style="text-align: center;">
        <vue-recaptcha
          ref="invisibleRecaptcha"
          @verify="onVerify"
          @expired="onExpired"
          size="invisible"
          sitekey="6LdMO6kUAAAAAHyTaXA5EL95TFn2atv5Rvf-7HOC">
        </vue-recaptcha>

        <button type="submit">Submit</button>
      </div>
    </form>

    <div v-if="this.result" style="text-align: center; border: 1px solid slategrey; padding: 40px;">
      <div class="request-form-header">
        Yachtski Request Form
      </div>

      <div>
        Your request was successfully submitted. Thank you!
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'
  import VueRecaptcha from 'vue-recaptcha'

  export default {
    data () {
      return {
        formData: {
          name: '',
          artist: '',
          title: '',
          link: '',
          message: '',
          source: 'form'
        },
        errors: [],
        result: null
      }
    },
    head () {
      return {
        title: 'Yachtki Request Form',
        script: [
          { src: 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit', async: true, defer: true }
        ]
      }
    },
    components: { VueRecaptcha },
    methods: {
      submit () {
        this.validateForm()

        if (!this.errors.length) {
          axios.post('/song_requests', this.formData)
            .then(result => {
              this.result = result
            }).catch(error => {
              if (error.response && error.response.data) {
                this.errors = error.response.data.errors
              }
            })
        }
      },
      validateForm () {
        this.clearErrors()

        if (!this.formData.name) {
          this.errors.push('Name cannot be blank')
        }

        if (!this.formData.artist) {
          this.errors.push('Artist cannot be blank')
        }

        if (!this.formData.title) {
          this.errors.push('Title cannot be blank')
        }

        if (!this.formData.message) {
          this.errors.push('Message cannot be blank. Explain yourself.')
        }
      },
      clearErrors () {
        this.errors = []
      },
      onSubmit () {
        this.$refs.invisibleRecaptcha.execute()
      },
      onVerify (response) {
        this.submit()
      },
      onExpired () {
        console.log('Expired')
      },
      resetRecaptcha () {
        this.$refs.recaptcha.reset() // Direct call reset method
      }
    }
  }
</script>

<style>
  .request-container {
    margin: 20px auto;
    max-width: 500px;
    text-align: left;
    font-size: 13px;
  }

  .request-form-header {
    margin-bottom: 20px;
    font-size: 20px;
    font-weight: 800;
    text-align: center;
  }

  .request-form {
    padding: 40px;
    border: 1px solid slategrey;
    border-radius: 2px;
  }

  .left {
    text-align: left;
  }

  .error-msg {
    color: #bb0000;
  }

  p {
    margin-bottom: 10px;
  }

  input {
    width: 100%;
    margin-bottom: 20px;
    padding: 10px;
  }

  textarea {
    width: 100%;
    border: 1px solid slategrey;
    padding: 10px;
  }

  button {
    padding: 10px;
  }
</style>
