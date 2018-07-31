<template>
  <div>
    <site-header/>

    <div class="dash-container">
      <admin-sidebar />

      <div class="admin-content-container">
        <nuxt/>
      </div>
    </div>

    <site-footer/>
  </div>
</template>

<script>
  import SiteHeader from '../components/SiteHeader'
  import SiteFooter from '../components/SiteFooter'
  import AdminSidebar from '../components/AdminSidebar'

  export default {
    components: {
      SiteHeader,
      SiteFooter,
      AdminSidebar
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

  .dash-container {
    display: grid;
    grid-template-columns: 1fr 3fr;
    grid-gap: 20px;
  }

  .admin-content-container {
    padding: 40px;
    border: 1px solid slategrey;
  }

  .admin-container > * {
    margin-bottom: 30px;
  }

  .admin-content-header {
    font-size: 36px;
    margin-bottom: 40px;
  }

  /* a, a:visited, a:active {
    text-decoration: none;
    color: #444;
  } */

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

  .content-header {
    margin-bottom: 40px;
    font-size: 24px;
    font-weight: 600;
  }

  .admin-form {
    padding: 20px;
    border: 1px solid #444;
  }

  label {
    display: block;
    margin-bottom: 10px;
    font-weight: 400;
    font-size: 12px;
  }

  input {
    display: block;
    width: 600px;
    padding: 10px;
    font-size: 14px;
  }

  textarea {
    padding: 10px;
    width: 600px;
    font-size: 14px;
  }

  .bottom-group {
    display: grid;
    grid-template-columns: 420px 180px;
  }

  .scores-group {
    display: grid;
    grid-template-columns: 200px 200px;
  }

  .scores-group input {
    width: 190px;
  }

  .submit-group {
    text-align: center;
  }

  .submit-group .yachtski-score {
    padding: 30px;
    font-size: 48px;
  }

  .form-group {
    padding: 10px;
  }

  .form-input {
    display: grid;
    margin-bottom: 10px;
    grid-template-columns: 1fr 4fr;
  }

  /* .content-header-container {
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
  } */

</style>
