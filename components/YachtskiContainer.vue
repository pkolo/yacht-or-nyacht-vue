<template>
  <div class="yachtski-container" :style="{ border: `1px ${yachtskiColor()} solid` }">
    <div class="yachtski-big-score">
      <div class="yachtski-score" :style="{ color: yachtskiColor() }">{{ yachtski}}</div>
      <div class="yachtski-status" :style="{ color: yachtskiColor() }">{{ yachtski | status }}</div>
    </div>
    <div class="yachtski-hosts">
      <div class="yachtski-host-score">
        <bullet :score="scores.hunter" />
        <span>JD</span>
        <span>{{ scores.jd }}</span>
      </div>
      <div class="yachtski-host-score">
        <bullet :score="scores.hunter" />
        <span>Hunter</span>
        <span>{{ scores.hunter }}</span>
      </div>
      <div class="yachtski-host-score">
        <bullet :score="scores.hunter" />
        <span>Steve</span>
        <span>{{ scores.steve }}</span>
      </div>
      <div class="yachtski-host-score">
        <bullet :score="scores.hunter" />
        <span>Dave</span>
        <span>{{ scores.dave }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { jayGradient } from '../mixins/gradient'

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
      }
    },
    props: {
      yachtski: Number,
      scores: Object
    },
    components: {
      Bullet
    },
    mixins: [jayGradient]
  }
</script>

<style>
</style>
