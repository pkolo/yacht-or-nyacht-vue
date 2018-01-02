<template>
  <div class="yachtski-container" :style="{ background: yachtskiColor() }">
    <iframe height="200" width="200" :src="`https://www.youtube.com/embed/${yt}?rel=0`" frameborder="0" allowfullscreen></iframe>

    <div class="scores-section">
      <div class="yachtski-big-score" :style="{ color: yachtskiColor(), background: `linear-gradient(to left, rgb(255, 255, 255) 50%, ${yachtskiColor()})` }">
        <div class="yachtski-score">{{ yachtski | roundNum }}</div>
        <div class="yachtski-status">{{ yachtski | status }}</div>
      </div>

      <div class="yachtski-hosts">
        <div class="yachtski-host-score" :style="{ background: `linear-gradient(to left, ${getColor(scores.jd)} 50%, ${yachtskiColor()})` }">
          <div class="host-score">JD | {{ scores.jd }}</div>
        </div>

        <div class="yachtski-host-score" :style="{ background: `linear-gradient(to left, ${getColor(scores.hunter)} 50%, ${yachtskiColor()})` }">
          <div class="host-score">Hunter | {{ scores.hunter }}</div>
        </div>

        <div class="yachtski-host-score" :style="{ background: `linear-gradient(to left, ${getColor(scores.steve)} 50%, ${yachtskiColor()})` }">
          <div class="host-score">Steve | {{ scores.steve }}</div>
        </div>

        <div class="yachtski-host-score" :style="{ background: `linear-gradient(to left, ${getColor(scores.dave)} 50%, ${yachtskiColor()})` }">
          <div class="host-score">Dave | {{ scores.dave }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { utilities } from '../mixins/utilities'

  import Bullet from './Bullet'

  export default {
    methods: {
      yachtskiColor () {
        return this.getColor(this.yachtski)
      }
    },
    filters: {
      status: function (yachtski) {
        if (yachtski >= 90) {
          return 'Essential Yacht Rock'
        } else if (yachtski >= 50) {
          return 'Certified Yacht Rock'
        } else {
          return 'Nyacht Rock'
        }
      },
      roundNum: function (number) {
        return +number.toFixed(2)
      }
    },
    props: {
      yachtski: Number,
      scores: Object,
      yt: String
    },
    components: {
      Bullet
    },
    mixins: [utilities]
  }
</script>

<style>
  .yachtski-container  {
    margin-bottom: 40px;
    padding: 20px;
    display: grid;
    grid-template-columns: 1fr 5fr;
    grid-gap: 20px;
    color: #fff;
    text-align: right;
  }

  .yachtski-big-score {
    padding: 5px 20px 10px 10px;
  }

  .yachtski-hosts {
    display: grid;
    grid-template-rows: repeat(4, 1fr);
  }

  .yachtski-host-score {
    padding: 4px 20px 4px 4px;
  }

  .yachtski-score {
    font-size: 50px;
  }
</style>
