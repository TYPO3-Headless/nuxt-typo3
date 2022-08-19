// Content element wrapper - Section Frame
// All props are returned from appearance
export default {
  name: 'T3Frame',
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
          `frame-${this.frameClass}`,
          `layout-${this.layout}`,
          `space-before-${
            this.spaceBefore.length ? this.spaceBefore : 'default'
          }`,
          `space-after-${
            this.spaceAfter.length ? this.spaceAfter : 'default'
          }`
        ]
      },
      this.$slots.default
    )
  }
}
