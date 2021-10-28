import middleware from '../middleware'

middleware.typo3i18n = function ({ app, store }) {
  const localeCode = app.$typo3.i18n.getLocaleByPath()
  if (localeCode !== store.state.typo3.locale) {
    app.$typo3.i18n.setLocale(localeCode)
  }
}
