<template>
  <div class="container" :style="{ border: `1px solid ${getColor(-1)}` }">
    <div class="content-header-container">
      <div class="content-header" :style="{ background: getColor(-1) }">
        <div class="title">
          Yacht or Nyacht Stats
        </div>
        <div class="subtitle">
          <span v-for="host in hosts">
            <nuxt-link :to="{ path: `/stats/${host}`}">{{ host | fullName }}</nuxt-link>
          </span>
        </div>
      </div>
    </div>

    <div class="content-container">
      <div class="host-stat-header">
        <div class="host-name">
          {{ hostName | fullName }}
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
            :host="hostName"
            :otherHost="`Others`"
            :hostStat="song.scores[hostName]"
            :otherHostStat="song.scores[hostName] - song.dissent"
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
            :host="hostName"
            :otherHost="`Others`"
            :hostStat="song.scores[hostName]"
            :otherHostStat="song.scores[hostName] - song.dissent"
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
            :host="hostName"
            :otherHost="song.other_host"
            :hostStat="song.yacht.scores[hostName]"
            :otherHostStat="song.yacht.scores[hostName] - song.yacht.disagreement"
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
            :host="hostName"
            :otherHost="song.other_host"
            :hostStat="song.nyacht.scores[hostName]"
            :otherHostStat="song.nyacht.scores[hostName] + song.nyacht.disagreement"
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
            :host="hostName"
            :otherHost="`Yachstki`"
            :hostStat="song.scores[hostName]"
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
            hostName: params.id,
            stats: res.data,
            hosts: ['jd', 'hunter', 'steve', 'dave']
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
      },
      fullName: function (name) {
        if (name === 'jd') {
          return 'JD Ryznar'
        } else if (name === 'hunter') {
          return 'Hunter Stair'
        } else if (name === 'steve') {
          return 'Steve Huey'
        } else if (name === 'dave') {
          return 'Dave Lyons'
        }
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
