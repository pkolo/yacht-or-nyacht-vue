<template>
  <section class="index-container">
    <div class="modal" v-show="showModal" @click="hideModal">
      <div class="modal-content">
        <h3><span class="site-name">Yacht or Nyacht?</span></h3>
        <p>
          Welcome! If you've ever wondered whether a particular song qualifies as Yacht Rock, you're in the right place! Yacht or Nyacht is a
          collection of songs rated on the Yachtski Scale, a scientific measurement of musical yacht-ness created by the
          <a href="http://www.yachtrock.com" target="_blank">originators of the term 'Yacht Rock'</a> (JD, Hunter, Steve, and Dave).
        </p>

        <p>
          Please note that while the Yachstki Scale is a continuum, 'Yacht Rock' is a binary.
          <span style="color: rgb(231, 128, 114)">Only songs rated 50 and above qualify as Yacht Rock - below 50 are NOT Yacht Rock,
           aka "Nyacht Rock."</span>
        </p>

        <p>
          Have a great day!
        </p>
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
  .index-container {
    max-width: 1250px;
  }

  .modal {
      position: fixed; /* Stay in place */
      z-index: 4; /* Sit on top */
      left: 0;
      top: 0;
      width: 100%; /* Full width */
      height: 100%; /* Full height */
      overflow: auto; /* Enable scroll if needed */
      background-color: rgb(0,0,0); /* Fallback color */
      background-color: rgba(0,0,0,0.8); /* Black w/ opacity */
  }

  /* Modal Content/Box */
  .modal-content {
    z-index: 5;
    background-color: #fefefe;
    margin: 10% auto;
    padding: 40px;
    border: 1px solid #888;
    width: 500px;
    font-size: 14px;
    text-align: center;
  }

  .modal-content > * {
    margin-bottom: 10px;
  }

  .modal-content > p {
    margin-bottom: 15px;
    text-align: justify;
  }

  @media (max-width: 768px) {
    .modal-content {
      margin: 5% auto;
      width: 350px;
      padding: 20px;
    }
  }

  @media (max-width: 425px) {
    .modal-content {
      margin: 5% auto;
      width: 95%;
      padding: 20px;
    }
  }
</style>
