export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Nuxt blog',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Open+Sans&display=swap'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff',
    height: '4px',
    duration: 5000
  },
  // only works with spa
  loadingIndicator: {
    name: 'circle',
    color: '#fa923f'
  },

  /*
   ** Global CSS
   */
  css: ['~/assets/main.css'],
  /*
   ** Plugins to load before mounting the App
   - good for any code that I wanna start up before app mounts
   */
  plugins: ['~/plugins/coreComponents.js', '~/plugins/dateFilter.js'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  env: {
    dbBaseUrl:
      process.env.DB_BASE_URL || 'https://nuxt-blog-b1ee4.firebaseio.com',
    fbAPIKey: 'AIzaSyA5ugJV11U9glgYFgDds8i7w_7geqrwepg'
  },
  router: {
    middleware: 'log'
    // base: '/my-app/'
    // extendRoutes(routes, resolve) {
    //   routes.push({
    //     path: '*',
    //     component: resolve(__dirname, 'pages/index.vue')
    //   })
    // }
  },
  transition: {
    name: 'fade',
    mode: 'out-in'
  }
}
