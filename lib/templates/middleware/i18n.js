import middleware from '../middleware'

middleware.i18n = function({ app, store }) {
  const localeCode = app.i18n.getLocaleByPath()

  if (localeCode !== store.state.typo3.locale) {
    app.i18n.setLocale(localeCode)
  }
}

export default function() {}
