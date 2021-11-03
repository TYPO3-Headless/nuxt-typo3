// Common props for TYPO3 Content Elements
export default {
  props: {
    /**
     * ID of CE / TYPO3 UID
     */
    id: {
      type: Number,
      required: true
    },
    /**
     * Type of CE / TYPO3 CType
     */
    type: {
      type: String,
      required: true
    },
    /**
     * Column position
     */
    colPos: {
      type: Number,
      default: 0
    },
    /**
     * Header content / TYPO3 header
     */
    header: {
      type: String,
      default: ''
    },
    /**
     * Header Type / TYPO3 header_layout
     */
    headerLayout: {
      type: Number,
      default: 0
    },
    /**
     * Header alignment / TYPO3 header_position
     */
    headerPosition: {
      type: String,
      default: ''
    },
    /**
     * Header link / TYPO3 header_link
     */
    headerLink: {
      type: [String, Object],
      default: ''
    },
    /**
     * Subheader / TYPO3 subheader
     */
    subheader: {
      type: String,
      default: ''
    }
  }
}
