<template>
  <no-ssr>
    <vue-slider
      style="padding-top: 40px"
      ref="slider"
      :value="value"
      v-bind="options"
      v-model="newVal"
      v-on:callback="updateRange()"
    />
  </no-ssr>
</template>

<script>
  import NoSSR from 'vue-no-ssr'

  export default {
    data () {
      return {
        options: {
          tooltipStyle: {
            'backgroundColor': '#ababab',
            'borderColor': '#ababab'
          },
          bgStyle: {
            'backgroundImage': '-webkit-linear-gradient(left, rgb(231, 128, 114), rgb(255, 214, 102), rgb(87, 187, 138))'
          },
          processStyle: {
            'backgroundColor': 'rgba(0, 0, 0, 0.0)'
          }
        },
        newVal: this.value
      }
    },
    methods: {
      updateRange () {
        this.$emit('input', this.newVal)
      }
    },
    props: {
      value: Array
    },
    components: {
      'no-ssr': NoSSR
    }
  }
</script>