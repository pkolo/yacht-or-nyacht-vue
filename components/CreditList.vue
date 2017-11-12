<template>
  <div class="content-section">
    <div class="content-section-header">
      {{ title }}
    </div>
    <div class="credit-list">
      <div class="credit" v-for="credit in credits">
        <bullet :score="credit.media.yachtski" />
        <div class="credit-title">
          <span v-html="$options.filters.artistURL(credit.media.artists)"></span> -
          <a :href="credit.media.url">{{ credit.media.title }}</a>
        </div>
        <div class="credit-roles">{{ credit.roles }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Bullet from './Bullet'

  export default {
    props: {
      credits: Array,
      title: String
    },
    components: {
      Bullet
    },
    filters: {
      artistURL: function (artists) {
        return artists.map(a => `<a class="white" href=${a.url}>${a.name}</a>`).join(', ')
      }
    }
  }
</script>

<style>
  .credit {
    display: grid;
    grid-template-columns: 20px 1fr 1fr;
    grid-gap: 20px;
    margin-bottom: 5px;
    border-bottom: 1px solid #dedede;
  }

  .credit-roles {
    text-align: right;
  }
</style>
