<template>
  <div class="bullet">
    <svg height="20" width="20">
      <rect width="20" height="20" :style="{ fill: getColor(score) }" />
    </svg>
  </div>
</template>

<script>
  import { jayGradient } from '../mixins/gradient'

  export default {
    props: {
      score: Number
    },
    mixins: [jayGradient]
  }
</script>
