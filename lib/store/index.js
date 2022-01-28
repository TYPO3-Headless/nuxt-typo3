import { state, actions, mutations } from '~typo3/store/typo3.js'

export default ({ store }) => {
  let moduleOptions = <%= serialize(options) %>

  store.registerModule('typo3', {
    namespaced: true,
    state,
    actions,
    mutations
  })

  if (moduleOptions?.store?.nuxtServerInit) {
    store.registerModule('typo3/nuxtServerInit', {
      actions: {
        async nuxtServerInit ({ dispatch }, context) {
          await dispatch('typo3/nuxtServerInit', context)
        }
      }
    })
  }
}
