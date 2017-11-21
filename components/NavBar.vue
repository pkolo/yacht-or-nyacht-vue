<template>
  <nav>
    <div class="site-name"><a href="/">Yacht Or Nyacht?</a></div>
    <div class="menu-section">
      <nav-menu :name="`Yacht Rock Links`" :links="yrLinks" />
      <nav-menu :name="`Yacht Or Nyacht Links`" :links="yonLinks" />
    </div>
  </nav>
</template>

<script>
  import NavMenu from './NavMenu'

  export default {
    data () {
      return {
        yrLinks: [
          {
            title: 'Yacht Rock Official',
            url: 'http://www.yachtrock.com/'
          },
          {
            title: 'Yacht Rock Webseries',
            url: 'http://www.yachtrock.com/yacht-rock-episodes'
          },
          {
            title: 'Certified Yacht Rock Spotify Playlist',
            url: 'http://www.yachtrock.com/yacht-rock-episodes'
          }
        ],
        yonLinks: [
          {
            title: 'Host Stats',
            url: '#'
          },
          {
            title: 'Fun Facts',
            url: '#'
          }
        ]
      }
    },
    components: {
      NavMenu
    }
  }
</script>

<style>
  nav {
    padding: 5px 20px;
    background: #dedede;
    display: -webkit-flex; /* Safari */
    -webkit-justify-content: space-between; /* Safari 6.1+ */
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  nav > * {

  }
</style>
