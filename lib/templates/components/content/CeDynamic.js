// Component to render CE based on type
export default {
  props: {
    /**
     * Content elements data props
     */
    data: {
      type: [Object, Array],
      required: true,
      default: () => {}
    },
    /**
     * type of content element
     */
    type: {
      type: String,
      required: true,
      default: 'text'
    }
  },
  render(createElement, ctx) {
    // content element components are registered as "CeComponent" convention
    // type is getting as "component"
    // we have to concat it and check if component is registered
    const componentName = `Ce${this.type[0].toUpperCase() + this.type.slice(1)}`
    const createComponent = () =>
      createElement(
        this.$nuxt.$options.components[componentName]
          ? `ce-${this.type}`
          : 'ce-default',
        {
          props: {
            ...{
              id: this.data.uid,
              type: this.data.type,
              appearance: this.data.appearance
            },
            ...this.data.content
          }
        }
      )

    if (process.env.debug) {
      return createElement('ce-debug', { props: this.data }, [
        createComponent()
      ])
    }

    return createComponent()
  }
}
