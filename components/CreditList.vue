<template>
  <div class="content-section">
    <div class="content-section-header">
      {{ title }}
    </div>
    <div class="credit-list">
      <div class="credit" v-for="credit in credits">
        <div class="credit-bullet">
          <bullet :score="credit.media.yachtski" />
          <div class="credit-links">
            <artist-links :artists="credit.media.artists" :featuredArtists="credit.media.featured_artists" />
            <span class="media-title"><nuxt-link :to="{ path: `${credit.media.resource_url}/${urlString(credit.media.title)}` }">{{ credit.media.title }}</nuxt-link></span>
          </div>
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
    grid-template-columns: 1fr 1fr;
    margin-bottom: 5px;
    border-bottom: 1px solid #dedede;
  }

  .credit-bullet {
    display: grid;
    grid-template-columns: 20px 1fr;
    grid-gap: 10px;
  }

  .credit-roles {
    text-align: right;
    font-size: 14px;
  }

  .media-title {
    display: inline-block;
  }

  .media-title:before {
    content: " - ";
    white-space: pre;
  }

  @media (max-width: 768px) {
    .credit {
      grid-template-columns: 1fr;
    }

    .credit-links {
      font-size: 14px;
    }

    .credit-roles {
      margin: 0 0 5px 35px;
      font-size: 12px;
      text-align: left;
    }
  }

  @media (max-width: 425px) {
    .credit-bullet {
      grid-gap: 5px;
    }

    .credit-roles {
      margin: 0 0 5px 30px;
    }
  }

</style>
