// Base backend layout mixin
export default {
  props: {
    /**
     * page contentData
     */
    content: {
      type: [Object, Array],
      required: true,
      default: () => {}
    }
  }
}
