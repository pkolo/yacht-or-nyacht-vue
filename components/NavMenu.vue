<template>
  <div class="dropdown-menu">
    <div class="menu-btn hide-sm">{{ name }}</div>
    <div class="menu-btn show-sm">|||</div>
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
    margin: 5px;
    padding: 10px;
    border: 1px solid #f1f1f1;
    border-radius: 5px;
    font-size: 12px;
    cursor: pointer;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    right: 5px;
    background-color: #f9f9f9;
    min-width: 200px;
    z-index: 1;
  }

  /* Links inside the dropdown */
  .dropdown-content a {
    font-size: 12px;
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
      background: rgba(87,187,138, 0.25);
  }

  @media (min-width: 769px) {
    .show-sm {
      display: none;
    }
  }

  @media (max-width: 768px) {
    .hide-sm {
      display: none;
    }
  }
</style>
