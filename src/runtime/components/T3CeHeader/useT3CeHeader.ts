import { computed } from 'vue'
// Due to this issue it is not possible to import types into props
// https://github.com/vuejs/core/issues/4294

export interface T3CeHeaderLink {
  additionalAttributes?: string[]
  class?: string
  href?: string
  linkText?: string
  target?: string
  title?: string
}

export interface T3CeHeaderProps {
  /**
   * Header content / TYPO3 header
   */
  header?: string
  /**
   * Header Type / TYPO3 header_layout
   */
  headerLayout?: number
  /**
   * Header alignment / TYPO3 header_position
   */
  headerPosition?: string
  /**
   * Header link / TYPO3 header_link
   */
  headerLink?: T3CeHeaderLink | string
  /**
   * Subheader / TYPO3 subheader
   */
  subheader?: string
}

/**
 * Provides headerLevel and headerClass computed values based on provided props
 * @param props
 */
export function useT3CeHeader (props: T3CeHeaderProps) {
  /**
   * By defualt if type is 0, set h1
   */
  const headerLevel = computed(() => {
    return props.headerLayout === 0 ? 1 : props.headerLayout
  })
  /**
   * Apply nuxt-typo3 default class name
   */
  const headerClass = computed(() => {
    return props.headerPosition ? `t3-ce-header--${props.headerPosition}` : ''
  })

  return { headerLevel, headerClass }
}
