<template>
  <div>
    <site-header/>
    <nuxt/>
    <site-footer/>
  </div>
</template>

<script>
  import SiteHeader from '../components/SiteHeader'
  import SiteFooter from '../components/SiteFooter'

  export default {
    components: {
      SiteHeader,
      SiteFooter
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

  a:hover {
    text-decoration: underline;
  }

  .site-name {
    font-family: "Shrikhand", sans-serif;
    font-size: 24px;
  }

  .site-name a {
    text-decoration: none;
  }

  .container {
    margin: 0 auto;
    max-width: 1023px;
  }

  .content-header-container {
    color: #fff;
  }

  .content-header-container a,
  .content-header-container a:visited,
  .content-header-container a:active {
    text-decoration: none;
    color: #fff;
  }

  .content-header {
    padding: 20px 20px;
    margin-bottom: 40px;
  }

  .content-header .title {
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

  .album-title {
    font-style: italic;
  }

  @media (max-width: 768px) {
    .content-header .title {
      font-size: 36px;
    }

    .content-header > .subtitle {
      font-size: 16px;
    }

    .content-container {
      padding: 0 5px;
    }
  }

  @media (max-width: 425px) {
    .content-header {
      text-align: center;
    }

    .content-header .title {
      font-size: 28px;
    }

    .content-header > .subtitle {
      font-size: 14px;
    }

    .subtitle > * + *:before{
      content: " | ";
      padding: 0 5px;
    }
  }

</style>
