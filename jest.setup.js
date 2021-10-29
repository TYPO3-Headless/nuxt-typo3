import { config } from '@vue/test-utils'

config.mocks.$nuxt = {
  $typo3: {
    options: {
      debug: false
    }
  }
}
