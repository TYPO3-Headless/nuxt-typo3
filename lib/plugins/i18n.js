import { getLocaleCodePath, getLocaleByPath, setLocale } from '~typo3/lib/i18n'

export default (context, options) => {
  const typo3State = context.store.state.typo3 || false
  return {
    ...options.i18n,
    get locale () {
      return typo3State ? typo3State.locale : options.i18n.defaultLocale
    },
    get locales () {
      return typo3State && typo3State.locales
        ? typo3State.locales
        : options.i18n.locales
    },
    get defaultLocale () {
      return typo3State && typo3State.domain
        ? typo3State.domain.i18n.defaultLocale
        : options.i18n.defaultLocale
    },
    getLocaleCodePath: () => getLocaleCodePath(context),
    getLocaleByPath: () => getLocaleByPath(context),
    setLocale: (localeCode, updateInitialData) =>
      setLocale(context, localeCode, updateInitialData)

  }
}
