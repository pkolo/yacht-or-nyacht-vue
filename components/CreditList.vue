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
          <nuxt-link :to="{ path: `/${type}/${credit.media.id}` }" class="media-title">{{ credit.media.title }}</nuxt-link>
        </div>
        <div class="credit-roles">{{ credit.roles }}</div>
      </div>
    </div>
  </div>
</template>

<script>
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

  .media-title {
    display: inline-block;
  }

  .media-title:before {
    content: " - ";
    white-space: pre;
  }

</style>
