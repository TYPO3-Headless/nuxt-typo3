import { SET_LOCALE_ACTIVE } from '~typo3/store/mutation-types'

/**
 * Get language code from path
 *
 * @param {Object} context - Nuxt context
 * @returns {String} localCode
 *
 */
function getLocaleByPath ({ isHMR, app, store, params, route }) {
  if (isHMR) { return }
  // get first path pram
  // e.g. en/path - get en
  const localeCode = route.path && route.path.split('/')[1]

  // check if received locale exist in our locales array
  if (
    app.$typo3.i18n.locales &&
    app.$typo3.i18n.locales.find(locale => locale === localeCode)
  ) {
    return localeCode // if localCode doesn't exist and current locale is not fallback locale
  }

  return app.$typo3.i18n.defaultLocale
}

/**
 * Set localCode for store/i18n settings and get initial data with correct lang
 *
 * @param {Object} Context - Nuxt context
 * @param {String} localeCode - String with locale code eg: "pl"
 * @returns {Promise}
 */
function setLocale (
  { app, store, params },
  localeCode,
  updateInitialData = true
) {
  app.$typo3.callHook('beforeLocaleChange', localeCode, store.state.typo3.locale)
  return new Promise((resolve, reject) => {
    if (localeCode) {
      if (updateInitialData) {
        store
          .dispatch('typo3/getInitialData', { path: params.pathMatch })
          .then((response) => {
            app.$typo3.callHook('localeChange', localeCode, store.state.typo3.locale)
            store.commit(SET_LOCALE_ACTIVE, localeCode)
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      } else {
        app.$typo3.callHook('localeChange', localeCode, store.state.typo3.locale)
        store.commit(SET_LOCALE_ACTIVE, localeCode)
        resolve({
          localeCode
        })
      }
    } else {
      reject(new Error('localeCode not provided'))
    }
  })
}

/**
 * Get locale code for URL path
 * @param {Object} app - Nuxt app context
 * @returns {String}
 */
function getLocaleCodePath ({ app }) {
  const locale = app.$typo3.i18n.locale
  return locale === app.$typo3.i18n.defaultLocale ? '' : locale
}

export { getLocaleByPath, setLocale, getLocaleCodePath }
