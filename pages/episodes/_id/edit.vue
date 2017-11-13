<template>
  <div class="add-song-form">
    <form @submit.prevent="addSong">
      <div class="form-group">
        <div class="form-input">
          <label>Title: </label>
          <input type="text" v-model="formData.title"/>
        </div>
        <div class="form-input">
          <label>Artist: </label>
          <input type="text" v-model="formData.credits_attributes[0].personnel_attributes.name"/>
        </div>
        <div class="form-input">
          <label>Year: </label>
          <input type="number" v-model.number="formData.year"/>
        </div>
      </div>

      <div class="form-group">
        <div class="form-input">
          <label>JD: </label>
          <input type="number" step="any" v-model.number="formData.jd_score"/>
        </div>
        <div class="form-input">
          <label>Hunter: </label>
          <input type="number" step="any" v-model.number="formData.hunter_score"/>
        </div>
        <div class="form-input">
          <label>Steve: </label>
          <input type="number" step="any" v-model.number="formData.steve_score"/>
        </div>
        <div class="form-input">
          <label>Dave: </label>
          <input type="number" step="any" v-model.number="formData.dave_score"/>
        </div>
      </div>

      <div class="form-group">
        <div class="yachtski-score">{{ avgScore }}</div>
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        formData: {
          title: '',
          year: 0,
          jd_score: 0,
          hunter_score: 0,
          steve_score: 0,
          dave_score: 0,
          credits_attributes: [{
            role: 'Temp Artist',
            personnel_attributes: {
              name: ''
            }
          }]
        }
      }
    },
    computed: {
      avgScore () {
        let form = this.formData
        return ((form.jd_score + form.hunter_score + form.steve_score + form.dave_score) / 4.0)
      }
    }
  }
</script>

<style>
  form {
    width: 75%;
    margin: 20px auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
    border: 1px solid #444;
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
