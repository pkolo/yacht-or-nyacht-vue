<template>
  <div class="slider-container">
    <div class="button-group">
      <div class="filter-button" @click="setValue([0,100])">All Songs</div>
      <div class="filter-button green" @click="setValue([90,100])">Essentials</div>
      <div class="filter-button yellow" @click="setValue([50,100])">Yacht Rock</div>
      <div class="filter-button red" @click="setValue([0,50])">Nyacht Rock</div>
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
          tooltipDir: ['bottom', 'bottom'],
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
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 10px;
    padding-bottom: 10px;
  }

  .filter-button {
    background: #ababab;
    padding: 10px;
    border-radius: 5px;
    color: #fff;
    font-size: 11px;
    text-align: center;
  }

  .filter-button.red {
    background: rgb(231, 128, 114);
  }

  .filter-button.yellow {
    background: rgb(147, 196, 125);
  }

  .filter-button.green {
    background: rgb(87,187,138);
  }

  @media (max-width: 768px) {
    .button-group {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: auto;
    }

    .filter-button {
      background: none;
      padding: 5px 10px;
      color: #ababab;
      text-decoration: underline;
    }

    .filter-button.red {
      background: none;
      color: rgb(231, 128, 114);
    }

    .filter-button.yellow {
      background: none;
      color: rgb(147, 196, 125);
    }

    .filter-button.green {
      background: none;
      color: rgb(87,187,138);
    }
  }
</style>
