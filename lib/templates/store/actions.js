import { SET_INITIAL } from './mutation-types'
import { isDynamicRoute } from '~typo3/lib/route'
export default {
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
        commit(SET_INITIAL, data)
        Promise.resolve(data)
      })
      .catch(error => Promise.reject(error))
  }
}
