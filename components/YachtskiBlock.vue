<template>
  <svg width="250" height="250">
    <g>
      <rect width="250" height="250" :style="{ fill: this.getColor(yachtski) }" />
      <text text-anchor="middle" fill="#ffffff" x="125" y="75" font-size="64">{{ yachtski }}</text>
      <text text-anchor="middle" fill="#ffffff" x="125" y="115" font-size="20">{{ subtitle }}</text>
    </g>
  </svg>
</template>

<script>
  import { jayGradient } from '../mixins/gradient'

  export default {
    props: {
      yachtski: Number,
      subtitle: String
    },
    mixins: [jayGradient]
  }
</script>

<style>

</style>
