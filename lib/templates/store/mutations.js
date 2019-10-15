import * as types from '~typo3/store/mutation-types'
export default {
  [types.SET_INITIAL](state, data) {
    state.initial = data
  },
  [types.SET_LOCALE](state, locale) {
    state.locale = locale
  },
  [types.SET_PAGE](state, data) {
    state.page = data
  }
}
