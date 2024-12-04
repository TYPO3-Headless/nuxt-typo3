import { computed } from 'vue'
import type { T3CeHeaderProps } from '../../../module'

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
