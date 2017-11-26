<template>
  <div class="slider-container">
    <div class="button-group">
      <button @click="setValue([0,100])">All Songs</button>
      <button style="background: rgb(87,187,138)" @click="setValue([90,100])">Essentials</button>
      <button style="background: rgb(194, 204, 114)" @click="setValue([50,100])">Yacht Rock</button>
      <button style="background: rgb(231, 128, 114)" @click="setValue([0,50])">Nyacht Rock</button>
    </div>
    <no-ssr>
      <vue-slider
        ref="slider"
        :value="value"
        v-bind="options"
        v-model="value"
        @drag-end="updateRange"
      />
    </no-ssr>
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
          height: 12,
          tooltipStyle: {
            'backgroundColor': '#ababab',
            'borderColor': '#ababab'
          },
          tooltipDir: ['left', 'right'],
          bgStyle: {
            'background': '-webkit-linear-gradient(left, rgb(231, 128, 114), rgb(255, 214, 102), rgb(87, 187, 138))',
            'boxShadow': 'inset 0.5px 0.5px 3px 1px rgba(0,0,0,.15)'
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

<style>
  .button-group {
    padding: 20px;
    width: 100%;
    display: inline-flex;
    justify-content: space-between;
  }

  button {
    background: #ababab;
    padding: 10px;
    outline: none;
    border: none;
    border-radius: 5px;
    font-family: 'Lato', sans-serif;
    color: #fff;
  }
</style>