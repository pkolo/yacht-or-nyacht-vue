<template>
  <div class="sidebar-container">
    <div class="sidebar-section">
      <div class="header">
        Welcome
      </div>

      <div class="content">
        <a href="" @click="logOut">Logout</a>
      </div>
    </div>

    <div class="sidebar-section">
      <div class="header">
        Requests
      </div>

      <div class="content">
        <div>
          <a href="/admin/requests">All Requests</a>
        </div>
      </div>
    </div>

    <div class="sidebar-section">
      <div class="header">
        Episodes
      </div>

      <div class="content">
        <div>
          <a href="/admin/episodes">All Episodes</a>
        </div>

        <div>
          <a href="/admin/episodes/new">New Episode</a>
        </div>
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
    background: rgb(87,187,138);
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

  .sidebar-section a {
    color: #fff;
  }
</style>
