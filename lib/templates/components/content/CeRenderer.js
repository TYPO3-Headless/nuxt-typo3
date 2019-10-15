// Component to render content elements loop
export default {
  name: 'CeRenderer',
  functional: true,
  props: {
    /**
     * Array of content elements - colPos[x] from contentData
     */
    content: {
      type: Array,
      required: true,
      default: () => []
    },
    /**
     * Control frame component displaying
     */
    frame: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  render(createElement, ctx) {
    // render standalone component
    function renderComponent(element) {
      return createElement('ce-dynamic', {
        props: {
          data: element,
          type: element.type
        }
      })
    }

    // render component with frame wrapper
    function renderFrame(element) {
      return createElement(
        'ce-frame',
        {
          props: element.appearance
        },
        [renderComponent(element)]
      )
    }

    // render loop of content elements
    return ctx.props.content.map(element =>
      ctx.props.frame && element.appearance.frameClass !== 'none'
        ? renderFrame(element)
        : renderComponent(element)
    )
  }
}
