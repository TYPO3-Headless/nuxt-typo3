// base content element mixin
import shareProps from './shareProps'
export default {
  // we have to disable inheriting of attributes because
  // we're binding all CE attributes returned from TYPO3 to dynamic content element
  // so a lot of them is unnecessary - we need to select only needed props
  inheritAttrs: false, // we have to disable inheriting attr
  mixins: [shareProps]
}
