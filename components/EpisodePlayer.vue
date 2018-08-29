<template>
  <div class="content-section">
    <div class="podcast-player">
      <iframe :src="episodeLink()" width="100%" height="180px" frameborder="0"></iframe>
    </div>

    <div class="air-date">
      <span>Originally aired {{episode.air_date}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      episode: Object,
      color: String
    },
    methods: {
      episodeLink () {
        return `https://omny.fm/shows/beyond-yacht-rock/${this.episode.data_id}/embed`
      }
    }
  }
</script>

<style>
  .air-date {
    text-align: right;
    font-size: 14px;
    color: #999;
  }
</style>
