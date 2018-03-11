<template>
  <div class="content-section">
    <div class="podcast-player">
      <div class="art19-web-player awp-medium awp-theme-light-blue" :data-primary-color="color" :data-episode-id="episode.data_id"></div>
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
    }
  }
</script>

<style>
  .air-date {
    margin-top: -15px;
    text-align: right;
    font-size: 14px;
    color: #999;
  }
</style>
