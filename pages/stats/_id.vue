<template>
  <div class="container" :style="{ border: `1px solid ${getColor(-1)}` }">
    <div class="content-header-container">
      <div class="content-header" :style="{ background: getColor(-1) }">
        <div class="title">
          Yacht or Nyacht Stats
        </div>
        <div class="subtitle">
          <span v-for="host in stats.all_hosts">
            <nuxt-link :to="{ path: `/stats/${host.slug}`}">{{ host.full_name }}</nuxt-link>
          </span>
        </div>
      </div>
    </div>

    <div class="content-container">
      <div class="host-stat-header">
        <div class="host-name">
          {{ stats.host.full_name }}
        </div>

        <div class="score-breakdown">
          <span :style="{ color: getColor(100) }">Essential: {{ stats.essential }}</span> |
          <span :style="{ color: getColor(75) }">Yacht: {{ stats.yacht_rock }}</span> |
          <span :style="{ color: getColor(10) }">Nyacht: {{ stats.nyacht_rock }}</span>
        </div>

        <div>
          <span>Average deviation from Yachtski: {{ stats.deviation_from_mean | roundNum }}</span>
        </div>
      </div>

      <div class="content-section">
        <div class="content-section-header">
          Largest 'Yacht' Dissents
        </div>

        <div class="stat-bar" v-for="(song, index) in stats.dissents.yacht">
          <stat-bar
            :index="index"
            :host="stats.host.full_name"
            :otherHost="`Others`"
            :hostStat="song.scores[stats.host.slug]"
            :otherHostStat="song.scores[stats.host.slug] - song.dissent"
            :song="song"
          />
        </div>
      </div>

      <div class="content-section">
        <div class="content-section-header">
          Largest 'Nyacht' Dissents
        </div>

        <div class="stat-bar" v-for="(song, index) in stats.dissents.nyacht">
          <stat-bar
            :index="index"
            :host="stats.host.full_name"
            :otherHost="`Others`"
            :hostStat="song.scores[stats.host.slug]"
            :otherHostStat="song.scores[stats.host.slug] - song.dissent"
            :song="song"
          />
        </div>
      </div>

      <div class="content-section">
        <div class="content-section-header">
          Largest 'Yacht' Disagreements
        </div>

        <div class="stat-bar" v-for="(song, index) in stats.disagreements">
          <stat-bar
            :index="0"
            :host="stats.host.full_name"
            :otherHost="song.other_host.full_name"
            :hostStat="song.yacht.scores[stats.host.slug]"
            :otherHostStat="song.yacht.scores[song.other_host.slug]"
            :song="song.yacht"
          />
        </div>
      </div>

      <div class="content-section">
        <div class="content-section-header">
          Largest 'Nyacht' Disagreements
        </div>

        <div class="stat-bar" v-for="(song, index) in stats.disagreements">
          <stat-bar
            :index="0"
            :host="stats.host.full_name"
            :otherHost="song.other_host.full_name"
            :hostStat="song.nyacht.scores[stats.host.slug]"
            :otherHostStat="song.nyacht.scores[song.other_host.slug]"
            :song="song.nyacht"
          />
        </div>
      </div>

      <div class="content-section">
        <div class="content-section-header">
          Weird Essentials
        </div>

        <div class="stat-bar" v-for="(song, index) in stats.weird_essentials">
          <stat-bar
            :index="index"
            :host="stats.host.full_name"
            :otherHost="`Yachtski`"
            :hostStat="song.scores[stats.host.slug]"
            :otherHostStat="song.yachtski"
            :song="song"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios'

  import { utilities } from '../../mixins/utilities'

  import StatBar from '../../components/StatBar'

  export default {
    asyncData ({ params }) {
      let id = params.id
      return axios.get(`/stats/${id}`)
        .then((res) => {
          return {
            stats: res.data
          }
        })
    },
    head () {
      return {
        title: 'Stats'
      }
    },
    components: {
      StatBar
    },
    filters: {
      roundNum: function (number) {
        return Math.round(number * 1000) / 1000
      }
    },
    mixins: [utilities]
  }
</script>


<style>
  .host-stat-header {
    font-size: 20px;
    text-align: center;
    margin-bottom: 20px
  }

  .host-name {
    font-size: 48px;
  }
</style>
