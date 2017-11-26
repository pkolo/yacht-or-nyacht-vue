<template>
  <section class="container" style="border: 1px solid #ababab">
    <div class="modal" v-show="showModal" @click="hideModal">
      <div class="modal-content">
        <h3><span class="site-name">Yacht or Nyacht?</span></h3>
        <p>Content here...</p>
      </div>
    </div>
    <div class="content-container">
      <song-list v-bind:showFilter="true" :songs="songs" />
    </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'

import SongList from '../components/SongList'

export default {
  data () {
    return {
      showModal: true
    }
  },
  asyncData () {
    return axios.get('/songs')
      .then((res) => {
        return { songs: res.data }
      })
  },
  head: {
    title: 'Home'
  },
  components: {
    SongList
  },
  methods: {
    hideModal () {
      this.showModal = false
    }
  }
}
</script>

<style>
  .modal {
      position: fixed; /* Stay in place */
      z-index: 1; /* Sit on top */
      left: 0;
      top: 0;
      width: 100%; /* Full width */
      height: 100%; /* Full height */
      overflow: auto; /* Enable scroll if needed */
      background-color: rgb(0,0,0); /* Fallback color */
      background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }

  /* Modal Content/Box */
  .modal-content {
      background-color: #fefefe;
      margin: 15% auto; /* 15% from the top and centered */
      padding: 20px;
      border: 1px solid #888;
      width: 500px; /* Could be more or less, depending on screen size */
      text-align: center;
  }

  .modal-content > * {
    margin-bottom: 10px;
  }

  .modal-content > p {
    margin-bottom: 10px;
    text-align: justify;
  }
</style>
