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

  a, a:visited, a:active {
    text-decoration: none;
    color: #444;
  }

  .content-header-container {
    padding: 10px;
    color: #fff;
    text-align: center;
  }

  .content-header {
    padding: 20px 10px;
    margin-bottom: 40px;
  }

  .content-header > .title {
    font-size: 50px;
  }

  .content-header > .subtitle {
    font-size: 20px;
  }

  .subtitle > * + *:before{
    content: " | ";
    padding: 0 10px;
  }

  .content-container {
    padding: 0 20px;
  }

  .content-section {
    margin-bottom: 40px;
  }

  .content-section-header {
    margin-bottom: 5px;
    padding-bottom: 5px;
    font-size: 18px;
    border-bottom: 1px solid #dedede;
  }

</style>
