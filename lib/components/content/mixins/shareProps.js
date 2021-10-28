// Common props for TYPO3 Content Elements
export default {
  props: {
    /**
     * ID of CE / TYPO3 UID
     */
    id: {
      type: Number,
      required: true,
      default: 0
    },
    /**
     * Type of CE / TYPO3 CType
     */
    type: {
      type: String,
      required: true,
      default: 'header'
    },
    /**
     * Header content / TYPO3 header
     */
    header: {
      type: String,
      required: false,
      default: ''
    },
    /**
     * Header Type / TYPO3 header_layout
     */
    headerLayout: {
      type: Number,
      required: false,
      default: 0
    },
    /**
     * Header alignment / TYPO3 header_position
     */
    headerPosition: {
      type: String,
      required: false,
      default: ''
    },
    /**
     * Date of publication / TYPO3 date
     */
    date: {
      type: Number,
      required: false,
      default: 0
    },
    /**
     * Header link / TYPO3 header_link
     */
    headerLink: {
      type: [String, Object],
      required: false,
      default: ''
    },
    /**
     * Subheader / TYPO3 subheader
     */
    subheader: {
      type: String,
      required: false,
      default: ''
    }
  }
}
