export default ({ app }) => {
  app.i18n.locale = app.$typo3.i18n.locale
  app.$typo3.hook('onLocaleChange', (newLocale, oldLocale) => {
    app.i18n.locale = newLocale
  })
}
