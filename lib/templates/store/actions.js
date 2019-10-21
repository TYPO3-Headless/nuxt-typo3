import { SET_INITIAL, SET_LOCALE } from './mutation-types'
import { isDynamicRoute } from '~typo3/lib/route'
export default {
  /**
   * Called during SSR init
   */
  async nuxtServerInit({ commit, dispatch, state }, { app }) {
    const localeCode = app.i18n.getLocaleByPath()
    commit(SET_LOCALE, localeCode)
    app.i18n.locale = localeCode
    await dispatch('getInitialData')
  },
  /**
   * Get initial data during nuxtServerInit
   *
   * @param {ActionContext} [vuexContext] commit
   * @return {void}
   */
  getInitialData(
    { commit, state },
    params = {
      path: this.$router.currentRoute.params.pathMatch
    }
  ) {
    // in case of static page
    // get initialData for homepage with correct locale
    if (!isDynamicRoute(this.$router.currentRoute)) {
      const localeCode = this.app.i18n.getLocaleCodePath()
      params.path = localeCode
    }
    return this.$typo3.$api
      .getInitialData(params)
      .then(response => {
        commit(SET_INITIAL, response.data)
        Promise.resolve(response.data)
      })
      .catch(error => Promise.reject(error))
  }
}
