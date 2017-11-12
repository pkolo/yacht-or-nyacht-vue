<template>
  <p>{{ personnel.name }}</p>
</template>

<script>
  import axios from 'axios'

  export default {
    asyncData ({ params }) {
      let id = params.slug.match(/\d+/)
      return axios.get(`http://localhost:3000/api/v1/personnel/${id}`)
        .then((res) => {
          return { personnel: res.data }
        })
    }
  }
</script>

<style>
</style>
