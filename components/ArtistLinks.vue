<template>
  <div>
    <div class="artist-links">
      <span v-for="artist in artists">
        <nuxt-link :to="{ path: `personnel/${artist.id}`}">{{ artist.name }}</nuxt-link>
      </span>
    </div>
    <div class="artist-links featured" v-if="featuredArtists.length > 0">
      <span v-for="artist in featuredArtists">
        <nuxt-link :to="{ path: `personnel/${artist.id}`}">{{ artist.name }}</nuxt-link>
      </span>
    </div>
    <nuxt-link :to="{ path: `songs/${songId}` }" class="song-title">{{ songTitle }}</nuxt-link>
  </div>
</template>

<script>
  export default {
    props: {
      artists: Array,
      featuredArtists: Array,
      songId: Number,
      songTitle: String
    }
  }
</script>

<style>
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

  .song-title:before {
    content: " - ";
    white-space: pre;
  }
</style>
