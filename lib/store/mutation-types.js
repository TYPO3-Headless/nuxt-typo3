const types = {
  SET_INITIAL_DATA: 'typo3/SET_INITIAL_DATA',
  SET_LOCALE_ACTIVE: 'typo3/SET_LOCALE_ACTIVE',
  SET_AVAILABLE_LOCALES: 'typo3/SET_AVAILABLE_LOCALES',
  SET_PAGE_DATA: 'typo3/SET_PAGE_DATA',
  SET_DOMAIN: 'typo3/SET_DOMAIN'
}

const _types = Object.fromEntries(
  Object.entries(types).map(([key, value]) => [key, value.replace('typo3/', '')])
)

export { _types, types }

// fallback
export const { SET_INITIAL_DATA, SET_LOCALE_ACTIVE, SET_AVAILABLE_LOCALES, SET_PAGE_DATA, SET_DOMAIN } = types
