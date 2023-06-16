export default {
  baseURL: 'http://127.0.0.1:3000',
  api: {
    baseURL: 'http://localhost:3000/api',
    endpoints: {
      initialData: '/?type=834'
    }
  },
  layouts: {},
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  },
  components: true,
  forms: false,
  headers: false,
  store: {
    nuxtServerInit: true
  },
  debug: false
}
