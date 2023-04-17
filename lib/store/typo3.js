import { _types as types } from './mutation-types'
import { isDynamicRoute } from '~typo3/lib/route'
import logger from '~typo3/lib/logger'

export const state = () => ({
  layout: 'default',
  locale: '',
  initial: {},
  page: {},
  domain: null,
  locales: null
})

export const actions = {
  /**
   * Called during SSR init
   */
  async nuxtServerInit ({ dispatch }, { app }) {
    if (app.$typo3.domains) {
      app.$typo3.domains.setDomain(app.$typo3.domains.getDomain())
    }
    app.$typo3.i18n.setLocale(app.$typo3.i18n.getLocaleByPath(), false)
    await dispatch('getInitialData')
  },
  /**
   * Get initial data during nuxtServerInit
   *
   * @param {ActionContext} [vuexContext] commit
   * @return {void}
   */
  getInitialData (
    { commit },
    params = {
      path: this.$router.currentRoute.params.pathMatch
    }
  ) {
    // in case of static page
    // get initialData for homepage with correct locale
    if (!isDynamicRoute(this.$router.currentRoute)) {
      const localeCode = this.app.$typo3.i18n.getLocaleCodePath()
      params.path = localeCode
    }
    return this.$typo3.api
      .getInitialData(params)
      .then(async (response) => {
        const { data } = response
        await this.$typo3.callHook('initialData', data)
        commit(types.SET_INITIAL_DATA, data)
        Promise.resolve(data)
      })
      .catch((error) => {
        logger.error(error)
      })
  }
}

export const mutations = {
  [types.SET_INITIAL_DATA] (state, data) {
    state.initial = data
  },
  [types.SET_LOCALE_ACTIVE] (state, locale) {
    state.locale = locale
  },
  [types.SET_PAGE_DATA] (state, data) {
    state.page = data
  },
  [types.SET_DOMAIN] (state, domain) {
    state.domain = domain
  },
  [types.SET_AVAILABLE_LOCALES] (state, locales) {
    state.locales = locales
  }
}
