<template>
  <div class="dropdown-menu">
    <div class="menu-btn">{{ name }}</div>
    <div class="dropdown-content">
      <div v-for="link in links">
        <a :href="link.url" target="_blank">{{ link.title }}</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      name: String,
      links: Array
    }
  }
</script>

<style>
  .dropdown-menu {
    position: relative;
    display: inline-block;
  }

  .menu-btn {
    padding: 10px;
    cursor: pointer;
    margin: 5px;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 200px;
    z-index: 1;
  }

  /* Links inside the dropdown */
  .dropdown-content a {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
  }

  /* Change color of dropdown links on hover */
  .dropdown-content a:hover {background-color: #f1f1f1}

  /* Show the dropdown menu on hover */
  .dropdown-menu:hover .dropdown-content {
      display: block;
  }

  /* Change the background color of the dropdown button when the dropdown content is shown */
  .dropdown-menu:hover .menu-btn {
      background-color: #3e8e41;
  }
</style>
