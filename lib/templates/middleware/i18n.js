import middleware from '../middleware'
import { getLocaleByPath, setLocale } from '~typo3/lib/i18n'

middleware.i18n = function({ isHMR, app, store, params }) {
  const localeCode = getLocaleByPath({ isHMR, app, store, params })

  if (localeCode !== store.state.typo3.locale) {
    setLocale({ app, store, params }, localeCode)
  }
}

export default function() {}
