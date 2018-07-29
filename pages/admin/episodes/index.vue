<template>
  <div class="admin-list-container">
    <div class="admin-content-header">
      Episodes
    </div>

    <div class="admin-list">
      <div class="admin-list-header">
        <div>Ep #</div>
        <div>Title</div>
        <div>Published?</div>
        <div>Air Date</div>
        <div></div>
      </div>

      <div class="admin-list-item" v-for="episode in episodes">
        <div>{{ episode.number }}</div>
        <div>{{ episode.show_title }}</div>
        <div>{{ episode.published }}</div>
        <div>{{ episode.air_date }}</div>
        <div><a :href="`/admin${episode.resource_url}`" target="_blank">Edit</a></div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'

  export default {
    layout: 'admin',
    head () {
      return {
        title: `Episodes`
      }
    },
    asyncData () {
      return axios.get(`/episodes`)
        .then((res) => {
          return {
            episodes: res.data
          }
        })
    }
  }
</script>

<style>
  .admin-list > div {
    display: grid;
    grid-template-columns: 1fr 2fr 2fr 2fr 1fr;
    padding: 5px;
  }

  .admin-list-header {
    color: #fff;
    background: #ababab;
  }

  .admin-list-item {
    border-bottom: 1px solid #ababab;
    font-size: 14px;
  }

  .admin-list-item:hover {
    background: #ffe;
  }
</style>
