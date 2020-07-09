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
  // content element components are registered in CamelCase like "CeMyComponent",
  // but the type is coming as "my_component" so we have to transform the name and the tag
  computed: {
    componentName() {
      const typeNameCamelCase = this.type.replace(/_([a-z])/g, g => {
        return g[1].toUpperCase()
      })

      return `Ce${typeNameCamelCase[0].toUpperCase() +
        typeNameCamelCase.slice(1)}`
    },
    componentTag() {
      return `ce-${this.type.replace(/_/g, '-')}`
    }
  },
  render(createElement, ctx) {
    const createComponent = () => {
      let elementTag

      if (this.$nuxt.$options.components[this.componentName]) {
        elementTag = this.componentTag
      } else {
        // fallback, try the old name and tag style (TODO: can be removed in future "breaking changes" version)
        const componentName = `Ce${this.type[0].toUpperCase() +
          this.type.slice(1)}`

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
            appearance: this.data.appearance
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
