import type { T3CeBaseProps, T3Link } from '..'

export interface T3CeHeaderProps extends T3CeBaseProps {
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
  headerLink?: T3Link | string
  /**
   * Subheader / TYPO3 subheader
   */
  subheader?: string
}
