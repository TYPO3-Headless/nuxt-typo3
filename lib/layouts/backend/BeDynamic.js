// Display backend layout depends on type
export default {
  functional: true,
  props: {
    /**
     * pageData
     */
    page: {
      type: Object,
      required: true,
      default: () => {}
    },
    /**
     * contentData
     */
    content: {
      type: [Object, Array],
      required: true,
      default: () => {}
    },
    /**
     * Type of backend layout to render
     */
    type: {
      type: String,
      required: true,
      default: 'default'
    }
  },
  render (createElement, ctx) {
    return createElement(`be-${ctx.props.type}`, {
      props: {
        content: ctx.props.content
      }
    })
  }
}
