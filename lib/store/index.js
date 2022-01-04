import actions from '~typo3/store/actions'
import mutations from '~typo3/store/mutations'

export default ({ store }) => {
  store.registerModule('typo3', {
    // can't be namespaced - we have to call nuxtServerInit
    // https://nuxtjs.org/guide/vuex-store/#the-nuxtserverinit-action
    namespaced: false,
    state: {
      layout: 'default',
      locale: '',
      initial: {},
      page: {},
      domain: null,
      locales: null,
      isLoggedIn: null
    },
    actions,
    mutations
  })
}
