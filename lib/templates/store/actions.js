import { SET_INITIAL, SET_LOCALE } from './mutation-types'
import { getLocaleByPath } from '~typo3/lib/i18n'
export default {
  /**
   * Called during SSR init
   */
  async nuxtServerInit({ commit, dispatch, state }, context) {
    await dispatch('getInitialData').then(() => {
      const localeCode = getLocaleByPath(context)
      commit(SET_LOCALE, localeCode)
      context.app.i18n.locale = localeCode
    })
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
    return this.$typo3.$api
      .getInitialData(params)
      .then(response => {
        commit(SET_INITIAL, response.data)
        Promise.resolve(response.data)
      })
      .catch(error => Promise.reject(error))
  }
}
