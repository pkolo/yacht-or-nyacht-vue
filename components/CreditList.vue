<template>
  <div class="content-section">
    <div class="content-section-header">
      {{ title }}
    </div>
    <div class="credit-list">
      <div class="credit" v-for="credit in credits">
        <bullet :score="credit.media.yachtski" />
        <div class="credit-title">{{ credit.media.title }}</div>
        <div class="credit-roles">{{ credit.roles.join(', ') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import Bullet from './Bullet'

  export default {
    props: {
      credits: Array,
      title: String
    },
    components: {
      Bullet
    }
  }
</script>

<style>
  .credit {
    display: grid;
    grid-template-columns: 20px 1fr 1fr;
    grid-gap: 20px;
    margin-bottom: 5px;
    border-bottom: 1px solid #dedede;
  }

  .credit-roles {
    text-align: right;
  }
</style>
