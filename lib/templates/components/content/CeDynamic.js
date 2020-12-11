// Component to render CE based on type
export default {
  props: {
    /**
     * Content elements data props
     */
    data: {
      type: [Object, Array],
      default: () => {}
    },
    /**
     * type of content element
     */
    type: {
      type: String,
      default: 'text'
    },
    /**
     * index of content element
     */
    index: {
      type: Number,
      default: -1
    }
  },
  render(createElement, ctx) {
    const createComponent = () => {
      // content element components are registered in CamelCase like "CeMyComponent",
      // but the type is coming as "my_component" so we have to transform the name and the tag
      const typeNameCamelCase = this.type.replace(/_([a-z])/g, g => {
        return g[1].toUpperCase()
      })

      let elementTag = `ce-${this.type.replace(/_/g, '-')}`
      let componentName = `Ce${typeNameCamelCase[0].toUpperCase() +
        typeNameCamelCase.slice(1)}`

      // fallback, try the old name and tag style (TODO: can be removed in future "breaking changes" version)
      if (!this.$nuxt.$options.components[componentName]) {
        componentName = `Ce${this.type[0].toUpperCase() + this.type.slice(1)}`

        if (this.$nuxt.$options.components[componentName]) {
          elementTag = `ce-${this.type}`
        } else {
          elementTag = 'ce-default'
        }
      }

      return createElement(elementTag, {
        props: {
          ...{
            id: this.data.uid,
            type: this.data.type,
            appearance: this.data.appearance,
            index: this.index
          },
          ...this.data.content
        }
      })
    }

    if (process.env.debug) {
      return createElement('ce-debug', { props: this.data }, [
        createComponent()
      ])
    }

    return createComponent()
  }
}
