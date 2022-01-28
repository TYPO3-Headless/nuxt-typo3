import { SET_DOMAIN, SET_AVAILABLE_LOCALES } from '~typo3/store/mutation-types'
import { getHostByURL } from '~typo3/lib/route'

/**
 * Find domain based on host and available domain list
 *
 * @param {Object} context - Nuxt context
 * @returns {Object} domain - Active domain object
 */
function getDomain ({ app, req }) {
  // get host depends on environment - SSR or browser
  if (app.$typo3.options.domains && app.$typo3.options.domains.length) {
    const host = getHostByURL(req ? req.headers.host : window.location.origin)
    return app.$typo3.options.domains.find(domain => domain.name === host)
  }
  return false
}

/**
 * Set active domain to store
 *
 * @param {Object} Context - Nuxt context
 * @param {Object} domain - Active domain object
 * @returns {void}
 */
function setDomain ({ store, app }, domain) {
  if (domain) {
    app.$typo3.api.setOptions(domain.api)
    store.commit(SET_AVAILABLE_LOCALES, domain.i18n.locales)
    store.commit(SET_DOMAIN, domain)
  }
}

export { getDomain, setDomain }
