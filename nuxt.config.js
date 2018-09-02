module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - Yacht or Nyacht?',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'The foremost authority on whether or not a given song is Yacht Rock... or Nyacht.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato:700|Shrikhand' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  plugins: [
    { src: '~plugins/vue-slider-component.js', ssr: false },
    '~/api/init.js'
  ],
  modules: [
    // Simple usage
    ['@nuxtjs/google-analytics', {
      id: 'UA-100779074-1'
    }]
  ],
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: ['axios', 'vue-slider-component']
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000/api/v1/'
  },
  router: {
    middleware: ['auth'],
    extendRoutes (routes, resolve) {
      routes.push(...[
        {
          name: 'episodes-wild',
          path: '/episodes/:id?/*',
          component: './pages/episodes/_id.vue'
        },
        {
          name: 'songs-wild',
          path: '/songs/:id?/*',
          component: './pages/songs/_id.vue'
        },
        {
          name: 'albums-wild',
          path: '/albums/:id?/*',
          component: './pages/albums/_id.vue'
        },
        {
          name: 'personnel-wild',
          path: '/personnel/:id?/*',
          component: './pages/personnel/_id.vue'
        },
      ])
    }
  }
}
