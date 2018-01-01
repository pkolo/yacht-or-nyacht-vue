<template>
  <div class="yachtski-container" :style="{ border: `1px ${yachtskiColor()} solid` }">
    <div class="yachtski-big-score">
      <div class="yachtski-score" :style="{ color: yachtskiColor() }">{{ yachtski | roundNum }}</div>
      <div class="yachtski-status" :style="{ color: yachtskiColor() }">{{ yachtski | status }}</div>
    </div>
    <div class="yachtski-hosts">
      <div class="yachtski-host-score">
        <bullet :score="scores.jd" />
        <div>JD</div>
        <div class="host-score">{{ scores.jd }}</div>
      </div>
      <div class="yachtski-host-score">
        <bullet :score="scores.hunter" />
        <div>Hunter</div>
        <div class="host-score">{{ scores.hunter }}</div>
      </div>
      <div class="yachtski-host-score">
        <bullet :score="scores.steve" />
        <div>Steve</div>
        <div class="host-score">{{ scores.steve }}</div>
      </div>
      <div class="yachtski-host-score">
        <bullet :score="scores.dave" />
        <div>Dave</div>
        <div class="host-score">{{ scores.dave }}</div>
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
      scores: Object
    },
    components: {
      Bullet
    },
    mixins: [utilities]
  }
</script>

<style>
  .yachtski-container {
    width: 60%;
    margin: 0 auto;
    margin-bottom: 40px;
    background: #fff;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }

  .yachtski-big-score {
    text-align: center;
  }

  .yachtski-hosts {
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-gap: 5px;
    padding: 5px 15px 5px 5px;
  }

  .yachtski-host-score {
    display: grid;
    grid-template-columns: 20px 1fr 1fr;
    grid-gap: 20px;
    border-bottom: 1px solid #dedede;
  }

  .yachtski-host-score:last-child {
    border-bottom: 0px solid #fff;
  }

  .yachtski-score {
    font-size: 50px;
  }

  .yachtski-status {
    font-size: 20px;
  }

  .host-score {
    text-align: right;
  }

  @media (max-width: 768px) {
    .yachtski-container {
      width: 95%;
    }
  }
</style>
