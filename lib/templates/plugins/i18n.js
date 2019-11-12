import { getLocaleCodePath, getLocaleByPath, setLocale } from '~typo3/lib/i18n'

export default (context, options) => {
  return {
    ...options.i18n,
    locale: context.store.state.typo3
      ? context.store.state.typo3.locale
      : options.i18n.defaultLocale,
    getLocaleCodePath: () => getLocaleCodePath(context),
    getLocaleByPath: () => getLocaleByPath(context),
    setLocale: (localeCode, updateInitialData) =>
      setLocale(context, localeCode, updateInitialData),
    onLocaleChange: () => null,
    beforeLocaleSwitch: () => null
  }
}
