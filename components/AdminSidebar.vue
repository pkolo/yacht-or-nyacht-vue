<template>
  <div class="sidebar-container">
    <div class="sidebar-section">
      <div class="header">
        Welcome
      </div>

      <div class="content">
        <a href="" @click="logOut">logout</a>
      </div>
    </div>

    <div class="sidebar-section">
      <div class="header">
        Episodes
      </div>

      <div class="content">
        <div>+ new episode</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    methods: {
      logOut () {
        this.$store.dispatch('auth/reset').then(() => {
          this.$router.push('/')
        })
      }
    }
  }
</script>

<style>
  .sidebar-container {
    padding: 20px;
    background: slategrey;
    color: #fff;
  }

  .sidebar-section {
    margin-bottom: 40px;
  }

  .sidebar-section .header {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid white;
    font-weight: 600;
  }

  .sidebar-section .content {
    margin-left: 10px;
    font-weight: 600;
  }
</style>
