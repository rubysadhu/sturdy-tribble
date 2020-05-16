export default {
  mode: 'spa',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      {
        charset: 'utf-8'
      }, {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      }, {
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
      }, {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'
      }, {
        rel: 'stylesheet',
        href: 'https://pro.fontawesome.com/releases/v5.13.0/css/all.css',
        lang: 'css',
        integrity: "sha384-IIED/eyOkM6ihtOiQsX2zizxFBphgnv1zbe1bKA+njdFzkr6cDNy16jfIKWu4FNH",
        crossorigin: "anonymous"
      }
    ],
    script: [
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js'
      }
    ]
  },
  loading: {
    color: '#fff'
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
  css: ['@/assets/css/style.css'],
  plugins: [
    {
      src: '~/plugins/animation'
    }
  ],
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/global-components'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/apollo'
  ],
  axios: {},
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: "https://hasura-3udj.onrender.com/v1/graphql",
        wsEndpoint: 'wss://hasura-3udj.onrender.com/v1/graphql',
        opts: {
          headers: {
            'x-hasura-admin-secret': "soupnazi"
          }
        }
      }
    }
  },
  server: {
    port: 8484
  },
  build: {
    extend (config, ctx) {

    }
  }
}
