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
    defaultLocale: 'en',
    onLocaleChange: () => null,
    beforeLocaleChange: () => null
  },
  registerComponents: true,
  registerLayouts: true
}
