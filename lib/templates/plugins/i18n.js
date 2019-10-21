import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { getLocaleCodePath, getLocaleByPath, setLocale } from '~typo3/lib/i18n'
Vue.use(VueI18n)

const options =<%= serialize(options) %>

export default (context) => {
  const { app, store } = context
  app.i18n = new VueI18n({
    ...options.i18n,
    locale: store.state.typo3 ? store.state.typo3.locale : options.i18n.locale
  })
  app.i18n.locales = options.i18n.locales
  app.i18n.getLocaleCodePath = () => getLocaleCodePath(context)
  app.i18n.getLocaleByPath = () => getLocaleByPath(context)
  app.i18n.setLocale = (localeCode) => setLocale(context, localeCode)
}
