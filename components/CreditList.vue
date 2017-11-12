<template>
  <div class="content-section">
    <div class="content-section-header">
      {{ title }}
    </div>
    <div class="credit-list">
      <div class="credit" v-for="credit in credits">
        <bullet :score="credit.media.yachtski" />
        <div class="credit-title">
          <span v-html="$options.filters.artistURL(credit.media.artists, credit.media.featured_artists)"></span> -
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
      artistURL: function (artists, featuredArtists) {
        let artistList = artists.map(a => `<a href=${a.url}>${a.name}</a>`).join(', ')
        if (featuredArtists.length > 0) {
          let featuredArtistList = featuredArtists.map(a => `<a href=${a.url}>${a.name}</a>`).join(', ')
          return `${artistList} w/ ${featuredArtistList}`
        }
        return artistList
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
