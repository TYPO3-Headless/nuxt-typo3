import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

const options =<%= serialize(options) %>

export default (context) => {
  const { app, store } = context
  app.i18n = new VueI18n({
    locale: store.state.typo3 ? store.state.typo3.locale : options.i18n.locale,
    fallbackLocale: options.i18n.fallbackLocale,
    messages: options.i18n.messages
  })
}
