<template>
  <div class="content-section">
    <div class="content-section-header">
      {{ title }}
    </div>
    <div class="credit-list">
      <div class="credit" v-for="credit in credits">
        <bullet :score="credit.media.yachtski" />
        <div class="credit-title">
          <artist-links :artists="credit.media.artists" :featuredArtists="credit.media.featured_artists" />
          <span class="media-title"><nuxt-link :to="{ path: `${credit.media.resource_url}/${urlString(credit.media.title)}` }">{{ credit.media.title }}</nuxt-link></span>
        </div>
        <div class="credit-roles">{{ credit.roles }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { utilities } from '../mixins/utilities'

  import Bullet from './Bullet'
  import ArtistLinks from './ArtistLinks'

  export default {
    props: {
      credits: Array,
      title: String,
      type: String
    },
    components: {
      Bullet,
      ArtistLinks
    },
    mixins: [utilities]
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

  .media-title {
    display: inline-block;
  }

  .media-title:before {
    content: " - ";
    white-space: pre;
  }

</style>
