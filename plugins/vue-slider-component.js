import Vue from 'vue'
import VueSlider from 'vue-slider-component'

const Slider = {
  install (Vue, options) {
    Vue.component('vue-slider-component', VueSlider)
  }
}

Vue.use(Slider)

export default Slider
