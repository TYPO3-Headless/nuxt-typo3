// Content element wrapper - Section Frame
// All props are returned from appearance
export default {
  name: 'T3Frame',
  functional: true,
  props: {
    frameClass: {
      type: String,
      default: ''
    },
    layout: {
      type: String,
      default: 'default'
    },
    spaceAfter: {
      type: String,
      default: 'default'
    },
    spaceBefore: {
      type: String,
      default: 'default'
    }
  },
  render (createElement, ctx) {
    return createElement(
      'div',
      {
        class: [
          't3-ce-frame',
          `frame-${ctx.props.frameClass}`,
          `layout-${ctx.props.layout}`,
          `space-before-${
            ctx.props.spaceBefore.length ? ctx.props.spaceBefore : 'default'
          }`,
          `space-after-${
            ctx.props.spaceAfter.length ? ctx.props.spaceAfter : 'default'
          }`
        ]
      },
      ctx.children
    )
  }
}
