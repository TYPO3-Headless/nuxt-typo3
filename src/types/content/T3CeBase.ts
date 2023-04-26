import type { T3Appearance, T3Link } from '..'
export interface T3CeBaseProps {
  /**
   * Header content / TYPO3 header
   */
  header?: string;
  /**
   * Header Type / TYPO3 header_layout
   */
  headerLayout?: number;
  /**
   * Header alignment / TYPO3 header_position
   */
  headerPosition?: string;
  /**
   * Header link / TYPO3 header_link
   */
  headerLink?: T3Link | string
  /**
   * Subheader / TYPO3 subheader
   */
  subheader?: string;
  /**
   * Content Element ID
   */
  uid?: number,
  /**
   * Index in the Renderer
   */
  index?: number,
  /**
   * Appearance setup
   */
  appearance?: T3Appearance,
}
