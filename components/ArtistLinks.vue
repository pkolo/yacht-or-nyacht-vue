<template>
  <div class="artist-link-section">
    <div class="artist-links">
      <span v-for="artist in artists">
        <nuxt-link :to="{ path: `/personnel/${artist.id}/${urlString(artist.name)}`}">{{ artist.name }}</nuxt-link>
      </span>
    </div>
    <div class="artist-links featured" v-if="featuredArtists.length > 0">
      <span v-for="artist in featuredArtists">
        <nuxt-link :to="{ path: `/personnel/${artist.id}/${urlString(artist.name)}`}">{{ artist.name }}</nuxt-link>
      </span>
    </div>
  </div>
</template>

<script>
  import { utilities } from '../mixins/utilities'

  export default {
    props: {
      artists: Array,
      featuredArtists: {
        required: false,
        default () {
          return []
        }
      }
    },
    mixins: [utilities]
  }
</script>

<style>
  .artist-link-section {
    display: inline-block;
  }

  .artist-links {
    display: inline-block;
  }

  .artist-links > * + *:before {
    content: ", ";
    white-space: pre;
  }

  .featured:before {
    content: " w/ ";
    white-space: pre;
  }
</style>
