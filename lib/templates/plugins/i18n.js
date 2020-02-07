import { getLocaleCodePath, getLocaleByPath, setLocale } from '~typo3/lib/i18n'

export default (context, options) => {
  return {
    ...options.i18n,
    get locale() {
      return context.store.state.typo3
        ? context.store.state.typo3.locale
        : options.i18n.defaultLocale
    },
    get locales() {
      return context.store.state.typo3 && context.store.state.typo3.locales
        ? context.store.state.typo3.locales
        : options.i18n.locales
    },
    getLocaleCodePath: () => getLocaleCodePath(context),
    getLocaleByPath: () => getLocaleByPath(context),
    setLocale: (localeCode, updateInitialData) =>
      setLocale(context, localeCode, updateInitialData),
    onLocaleChange: () => null,
    beforeLocaleChange: () => null
  }
}
