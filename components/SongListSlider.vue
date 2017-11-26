<template>
  <div class="slider-container">
    <no-ssr>
      <vue-slider
        style="padding-top: 40px"
        ref="slider"
        :value="value"
        v-bind="options"
        v-model="value"
        @drag-end="updateRange"
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
          min: 0,
          max: 100,
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
        value: [0, 100]
      }
    },
    methods: {
      updateRange () {
        this.$emit('input', this.value)
      },
      setValue (newValue) {
        this.value = newValue
        this.updateRange()
      }
    },
    components: {
      'no-ssr': NoSSR
    }
  }
</script>