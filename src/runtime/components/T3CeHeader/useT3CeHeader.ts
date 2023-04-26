import { computed } from 'vue'
// Due to this issue it is not possible to import types into props
// https://github.com/vuejs/core/issues/4294
import { T3CeHeaderProps } from '~/../src/types'

/**
 * Provides headerLevel and headerClass computed values based on provided props
 * @param props
 */
export function useT3CeHeader (props: T3CeHeaderProps) {
  /**
   * By defualt if type is 0, set h1
   */
  const headerLevel = computed(() => {
    return props.headerLayout === 0 ? 1 : props.headerLayout || 1
  })
  /**
   * Apply nuxt-typo3 default class name
   */
  const headerClass = computed(() => {
    return props.headerPosition ? `t3-ce-header--${props.headerPosition}` : ''
  })

  return { headerLevel, headerClass }
}
