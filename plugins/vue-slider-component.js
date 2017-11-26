import Vue from 'vue'
import vueSlider from 'vue-slider-component'

const Slider = {
  install (Vue, options) {
    Vue.component('vue-slider', vueSlider)
  }
}

Vue.use(Slider)
