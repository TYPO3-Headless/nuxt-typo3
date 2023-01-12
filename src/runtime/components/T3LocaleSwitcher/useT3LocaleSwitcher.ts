import type { ComputedRef, Ref } from 'vue'
import type { T3I18N } from '../../../types'
import { useT3PageState } from '../../composables/useT3Api'
import { useT3i18nState } from '../../composables/useT3i18n'

const useT3LocaleSwitcher = (): {
  /**
   * List of available locales for current page
   */
  locales: ComputedRef<T3I18N[]>
  /**
   * Current locale code
   */
  currentCode: Ref<string>
  /**
   * Current locale T3I18N object
   */
  currentLocale: ComputedRef<T3I18N | undefined>
} => {
  const data = useT3PageState()
  const locale = useT3i18nState()

  const locales = computed(() => data.value?.i18n || [])
  const currentLocale = computed(() =>
    locales.value?.find(
      t3locale => t3locale.twoLetterIsoCode === locale.value
    )
  )

  return {
    locales,
    currentCode: locale,
    currentLocale
  }
}

export default useT3LocaleSwitcher
