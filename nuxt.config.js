module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - Yacht or Nyacht?',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    script: [
      { src: 'https://web-player.art19.com/assets/current.js' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato:700|Shrikhand' },
      { rel: 'stylesheet', href: 'https://web-player.art19.com/assets/current.css'}
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
    { src: '~plugins/vue-slider-component.js', ssr: false }
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
    baseUrl: process.env.BASE_URL || 'http://yacht-or-nyacht-api.herokuapp.com/api/v1'
  },
  router: {
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
