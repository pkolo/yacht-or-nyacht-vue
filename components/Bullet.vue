<template>
  <div class="bullet">
    <svg height="20" width="20">
      <rect width="20" height="20" :style="{ fill: getColor(score) }" />
    </svg>
  </div>
</template>

<script>
  import { utilities } from '../mixins/utilities'

  export default {
    props: {
      score: Number
    },
    mixins: [utilities]
  }
</script>
