import type { RouteLocationNormalized } from 'vue-router'
import { isEqual } from 'ufo'
import { useT3i18n } from '../composables/useT3i18n'

export async function t3i18nMiddleware (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized
) {
  const { getLocale, setLocale, currentLocale } = useT3i18n(to.fullPath)
  const newLocale = getLocale(to.fullPath)

  if (
    !import.meta.server &&
    !isEqual(to.fullPath, from.fullPath) &&
    currentLocale.value !== newLocale
  ) {
    await setLocale(newLocale)
  }
}
