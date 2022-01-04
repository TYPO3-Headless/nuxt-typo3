// Component to render CE based on type
import { getBackendLayout } from '../../lib/layouts'
export default {
  name: 'T3Dynamic',
  props: {
    layout: {
      type: Boolean,
      default: false
    },
    /**
     * Content elements data props
     */
    data: {
      type: [Object, Array],
      required: true
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
  methods: {
    createContentElement () {
      // content element are registered in PascalCase or kebab-case like "CeMyComponent" or "ce-my-component"
    // but the type is coming as "my_component" so we have to transform the name and the tag
      const typeNameCamelCase = this.type.replace(/_([a-z])/g, (g) => {
        return g[1].toUpperCase()
      })

      let elementTag = `t3-ce-${this.type.replace(/_/g, '-')}`
      const componentName = `T3Ce${typeNameCamelCase[0].toUpperCase() +
      typeNameCamelCase.slice(1)}`

      // check if global component exist, if not display <t3-ce-default/>
      if (!(this.$root.$options.components[componentName] || this.$root.$options.components[elementTag])) {
        elementTag = 't3-ce-default'
      }

      return [elementTag, {
        props: {
          ...{
            id: this.data.id,
            type: this.data.type,
            appearance: this.data.appearance,
            index: this.index
          },
          ...this.data.content
        }
      }]
    },
    createBackendLayout () {
      const layout = getBackendLayout(this.type, this.$root.$options.components)

      return [layout, {
        props: {
          content: this.data
        }
      }]
    }
  },
  render (createElement) {
    const [tag, data] = this.layout ? this.createBackendLayout() : this.createContentElement()
    const element = createElement(tag, data)

    if (this.$nuxt.$typo3.options.debug) {
      return createElement('t3-debug', { props: this.data }, [
        element
      ])
    }

    return element
  }
}
