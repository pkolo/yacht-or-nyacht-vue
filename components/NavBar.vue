<template>
  <nav>
    <div class="site-name"><a href="/">Yacht Or Nyacht?</a></div>
    <div class="menu-section">
      <nav-menu :name="`Yacht Rock Links`" :links="yrLinks" />
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
            title: 'Beyond Yacht Rock Podcast',
            url: 'https://starburns.audio/podcasts/beyond-yacht-rock/'
          },
          {
            title: 'Yacht Or Nyacht Stats',
            url: '/stats/jd'
          },
          {
            title: 'Yacht Rock Official',
            url: 'http://www.yachtrock.com/'
          },
          {
            title: 'Yacht Rock Webseries',
            url: 'http://www.yachtrock.com/yacht-rock-episodes'
          },
          {
            title: 'YR Spotify Playlist',
            url: 'https://open.spotify.com/user/jdryznar/playlist/6kVRZHsbV6LZEBiqzSzFvq'
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
    padding: 0 10px;
    border-bottom: 1px solid #dedede;
    display: -webkit-flex; /* Safari */
    -webkit-justify-content: space-between; /* Safari 6.1+ */
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  @media (max-width: 425px) {
    nav {
      padding: 0 5px;
    }
  }
</style>
