<template>
  <div class="slider-container">
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
    <button @click="setValue([0,100])">All Songs</button>
    <button @click="setValue([0,50])">Nyacht</button>
    <button @click="setValue([50,100])">Yacht</button>
    <button @click="setValue([90,100])">Essential</button>
  </div>
</template>

<script>
  import NoSSR from 'vue-no-ssr'

  export default {
    data () {
      return {
        options: {
          clickable: false,
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
      },
      setValue (newVal) {
        this.newVal = newVal
        this.updateRange()
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