<template>
  <div>
    <site-header/>
    <nuxt/>
  </div>
</template>

<script>
  import SiteHeader from '../components/SiteHeader'

  export default {
    components: {
      SiteHeader
    }
  }
</script>

<style>
  html {
    font-family: "Lato", sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    color: #444;
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: border-box;
    margin: 0;
  }

  body {
    max-width: 1250px;
    margin: 0px auto;
  }
</style>
