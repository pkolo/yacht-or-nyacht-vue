<template>
  <input ref="input" :value="value" v-on:input="updateFilter($event.target.value)"/>
</template>

<script>
  export default {
    props: {
      value: String
    },
    methods: {
      updateFilter (newValue) {
        this.$emit('input', newValue)
      }
    }
  }
</script>

<style>
</style>
